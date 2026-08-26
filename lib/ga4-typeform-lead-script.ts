import {
  APPOINTMENT_FORM_TYPE,
  APPOINTMENT_TYPEFORM_ID,
  TYPEFORM_EMBED_SCRIPT,
  ga4Events,
} from "@/lib/ga4"

/**
 * Inline browser hook rendered in app/layout.tsx so /contact and /forms HTML
 * contains the generate_lead listener for Typeform qYX51Bgz. The appointment
 * CTA is an outbound link (not a page iframe); this script opens Typeform's
 * official popup embed so onSubmit / postMessage can fire after a real submit.
 */
export const GA4_TYPEFORM_LEAD_SCRIPT = `
(function () {
  if (window.__wcrcTypeformLeadHook) {
    return;
  }
  window.__wcrcTypeformLeadHook = true;

  var FORM_ID = ${JSON.stringify(APPOINTMENT_TYPEFORM_ID)};
  var FORM_TYPE = ${JSON.stringify(APPOINTMENT_FORM_TYPE)};
  var GENERATE_LEAD = ${JSON.stringify(ga4Events.generateLead)};
  var FORM_START = ${JSON.stringify(ga4Events.formStart)};
  var EMBED_SRC = ${JSON.stringify(TYPEFORM_EMBED_SCRIPT)};
  var LEAD_DEDUP_MS = 4000;
  var lastLeadAt = 0;
  var embedPromise = null;
  var activePopup = null;

  function emit() {
    try {
      if (typeof window.gtag === "function") {
        window.gtag.apply(window, arguments);
        return;
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    } catch (error) {}
  }

  function leadParams(location) {
    var params = { form_type: FORM_TYPE };
    if (location) {
      params.location = location;
    }
    return params;
  }

  function trackFormStart(location) {
    emit("event", FORM_START, leadParams(location));
  }

  function trackGenerateLead(location) {
    var now = Date.now();
    if (now - lastLeadAt < LEAD_DEDUP_MS) {
      return;
    }
    lastLeadAt = now;
    emit("event", GENERATE_LEAD, leadParams(location));
  }

  function trackVercelClick(eventName, location) {
    if (!eventName) {
      return;
    }
    try {
      if (typeof window.va !== "function") {
        window.va = function () {
          (window.vaq = window.vaq || []).push(arguments);
        };
      }
      window.va("event", {
        name: eventName,
        data: location ? { location: location } : {},
      });
    } catch (error) {}
  }

  function isAppointmentHref(href) {
    try {
      var url = new URL(href, window.location.origin);
      return (
        (url.hostname === "typeform.com" || url.hostname.slice(-13) === ".typeform.com") &&
        url.pathname.indexOf("/to/" + FORM_ID) !== -1
      );
    } catch (error) {
      return false;
    }
  }

  function locationFromElement(element) {
    var tracked = element.closest("[data-analytics-location]");
    var location = tracked && tracked.getAttribute("data-analytics-location");
    if (location && location.trim()) {
      return location.trim();
    }
    var path = window.location.pathname;
    if (path === "/") {
      return "home";
    }
    return (
      path
        .replace(/^\\/+|\\/+$/g, "")
        .replace(/[^A-Za-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 80) || "unknown"
    );
  }

  function isTypeformOrigin(origin) {
    try {
      var hostname = new URL(origin).hostname;
      return hostname === "typeform.com" || hostname.slice(-13) === ".typeform.com";
    } catch (error) {
      return false;
    }
  }

  function messageFormId(data) {
    if (!data || typeof data !== "object") {
      return undefined;
    }
    if (typeof data.formId === "string") {
      return data.formId;
    }
    if (data.data && typeof data.data.formId === "string") {
      return data.data.formId;
    }
    if (data.payload && typeof data.payload.formId === "string") {
      return data.payload.formId;
    }
    return undefined;
  }

  function messageType(data) {
    if (!data || typeof data !== "object") {
      return "";
    }
    if (typeof data.type === "string") {
      return data.type;
    }
    if (typeof data.event === "string") {
      return data.event;
    }
    if (data.data && typeof data.data.type === "string") {
      return data.data.type;
    }
    return "";
  }

  function isTypeformSubmitMessage(data) {
    var type = messageType(data);
    if (type !== "form-submit" && type !== "form-submitted" && type !== "form_submit") {
      return false;
    }
    var formId = messageFormId(data);
    return formId === undefined || formId === FORM_ID;
  }

  function loadTypeformEmbed() {
    if (window.tf && window.tf.createPopup) {
      return Promise.resolve(window.tf);
    }
    if (embedPromise) {
      return embedPromise;
    }

    embedPromise = new Promise(function (resolve, reject) {
      var settled = false;
      function finish(api, error) {
        if (settled) {
          return;
        }
        settled = true;
        if (api && api.createPopup) {
          resolve(api);
          return;
        }
        embedPromise = null;
        reject(error || new Error("Typeform embed API was not available"));
      }

      function waitForApi() {
        if (window.tf && window.tf.createPopup) {
          finish(window.tf);
          return;
        }
        var attempts = 0;
        var timer = setInterval(function () {
          attempts += 1;
          if (window.tf && window.tf.createPopup) {
            clearInterval(timer);
            finish(window.tf);
          } else if (attempts > 80) {
            clearInterval(timer);
            finish(null);
          }
        }, 50);
      }

      var existing = document.querySelector('script[src="' + EMBED_SRC + '"]');
      if (existing) {
        if (window.tf && window.tf.createPopup) {
          finish(window.tf);
          return;
        }
        existing.addEventListener("load", waitForApi, { once: true });
        existing.addEventListener(
          "error",
          function () {
            finish(null, new Error("Typeform embed script failed to load"));
          },
          { once: true },
        );
        waitForApi();
        return;
      }

      var script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      script.addEventListener("load", waitForApi, { once: true });
      script.addEventListener(
        "error",
        function () {
          finish(null, new Error("Typeform embed script failed to load"));
        },
        { once: true },
      );
      document.head.appendChild(script);
    });

    return embedPromise;
  }

  function openAppointmentTypeform(location, fallbackHref, fallbackTarget) {
    trackFormStart(location);
    loadTypeformEmbed()
      .then(function (embed) {
        if (activePopup && typeof activePopup.unmount === "function") {
          activePopup.unmount();
        }
        activePopup = embed.createPopup(FORM_ID, {
          size: 100,
          onSubmit: function () {
            trackGenerateLead(location);
          },
        });
        activePopup.open();
      })
      .catch(function () {
        if (fallbackHref) {
          window.open(fallbackHref, fallbackTarget || "_blank", "noopener,noreferrer");
        }
      });
  }

  function isModifiedClick(event) {
    return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  document.addEventListener(
    "click",
    function (event) {
      if (event.defaultPrevented) {
        return;
      }
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      var telLink = target.closest('a[href^="tel:"]');
      if (telLink) {
        var phoneLocation = locationFromElement(telLink);
        emit("event", GENERATE_LEAD, {
          lead_source: "website_phone",
          location: phoneLocation,
          method: "phone",
          contact_method: "phone",
        });
        return;
      }

      var appointmentLink = target.closest("a[href]");
      if (!appointmentLink || !isAppointmentHref(appointmentLink.href)) {
        return;
      }

      var location = locationFromElement(appointmentLink);
      var vercelEvent = appointmentLink.getAttribute("data-analytics-event");
      if (vercelEvent) {
        trackVercelClick(vercelEvent, location);
      }

      if (isModifiedClick(event)) {
        trackFormStart(location);
        return;
      }

      event.preventDefault();
      openAppointmentTypeform(location, appointmentLink.href, appointmentLink.target);
    },
    true,
  );

  window.addEventListener("message", function (event) {
    if (!isTypeformOrigin(event.origin) || !isTypeformSubmitMessage(event.data)) {
      return;
    }
    trackGenerateLead("typeform_embed");
  });
})();
`
