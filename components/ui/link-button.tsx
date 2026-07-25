import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { Button, type ButtonProps } from "@/components/ui/button"
import { analyticsAttributes, type AnalyticsEventName } from "@/lib/analytics"
import { cn } from "@/lib/utils"

/**
 * Anchor props + the button's visual variants. Deliberately built on anchor
 * attributes rather than ButtonProps: the rendered element is always an <a>
 * (Button only supplies styling via asChild), so anchor event-handler types are
 * the correct ones. Next-specific navigation options are picked off LinkProps
 * explicitly so they are never spread onto a plain external <a>.
 */
type NextLinkOptions = Pick<LinkProps, "prefetch" | "replace" | "scroll" | "shallow" | "locale">

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    NextLinkOptions,
    Pick<ButtonProps, "variant" | "size"> {
  href: string
  icon?: React.ReactElement<{ className?: string }>
  iconPosition?: "left" | "right"
  analyticsEvent?: AnalyticsEventName
  analyticsLocation?: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      children,
      icon,
      iconPosition = "left",
      className,
      variant,
      size,
      target,
      rel,
      analyticsEvent,
      analyticsLocation,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      ...props
    },
    ref,
  ) => {
    const iconMarkup = icon
      ? React.cloneElement(icon, {
          className: cn(
            "h-5 w-5", // Standard icon size within button
            children ? (iconPosition === "left" ? "mr-2" : "ml-2") : "",
            icon.props.className,
          ),
        })
      : null

    // Check if it's an external link
    const isExternalLink = href.startsWith("http") || href.startsWith("//") || target === "_blank"
    const trackingProps = analyticsEvent ? analyticsAttributes(analyticsEvent, analyticsLocation ?? "unknown") : {}

    const content = (
      <>
        {iconPosition === "left" && iconMarkup}
        <span>{children}</span>
        {iconPosition === "right" && iconMarkup}
      </>
    )

    if (isExternalLink) {
      return (
        <Button asChild variant={variant} size={size} className={className}>
          <a href={href} ref={ref} target={target} rel={rel} {...trackingProps} {...props}>
            {content}
          </a>
        </Button>
      )
    }

    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link
          href={href}
          ref={ref}
          target={target}
          rel={rel}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          locale={locale}
          {...trackingProps}
          {...props}
        >
          {content}
        </Link>
      </Button>
    )
  },
)

LinkButton.displayName = "LinkButton"

export { LinkButton }
