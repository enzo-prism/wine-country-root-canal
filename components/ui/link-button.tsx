import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { Button, type ButtonProps } from "@/components/ui/button"
import { analyticsAttributes, type AnalyticsEventName } from "@/lib/analytics"
import { cn } from "@/lib/utils"

// Combine ButtonProps and relevant LinkProps, plus external link props
interface LinkButtonProps extends ButtonProps, Omit<LinkProps, "as" | "passHref"> {
  href: string
  icon?: React.ReactElement
  iconPosition?: "left" | "right"
  target?: string
  rel?: string
  analyticsEvent?: AnalyticsEventName
  analyticsLocation?: string
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { href, children, icon, iconPosition = "left", className, variant, size, target, rel, analyticsEvent, analyticsLocation, ...props },
    ref,
  ) => {
    const iconMarkup = icon
      ? React.cloneElement(icon, {
          className: cn(
            "h-5 w-5", // Standard icon size within button
            children ? (iconPosition === "left" ? "mr-2" : "ml-2") : "",
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
        <Link href={href} ref={ref} {...trackingProps} {...props}>
          {content}
        </Link>
      </Button>
    )
  },
)

LinkButton.displayName = "LinkButton"

export { LinkButton }
