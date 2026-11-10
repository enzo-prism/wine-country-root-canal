import assert from "node:assert/strict"
import { describe, it } from "node:test"

import * as sms from "./sms-program.ts"
import { PRACTICE_PHONE_DISPLAY } from "./practice.ts"

describe("SMS terms flag", () => {
  it("defaults to off", () => {
    assert.equal(sms.isSmsTermsEnabled(undefined), false)
    assert.equal(sms.isSmsTermsEnabled(""), false)
  })

  it("stays off for anything other than true", () => {
    for (const value of ["false", "0", "1", "yes", "on", "truee", "enabled"]) {
      assert.equal(sms.isSmsTermsEnabled(value), false, value)
    }
  })

  it("turns on only for true", () => {
    for (const value of ["true", "TRUE", " True "]) {
      assert.equal(sms.isSmsTermsEnabled(value), true, value)
    }
  })

  it("reads NEXT_PUBLIC_SMS_TERMS_ENABLED when no value is passed", () => {
    const previous = process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED
    try {
      delete process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED
      assert.equal(sms.isSmsTermsEnabled(), false)
      process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED = "true"
      assert.equal(sms.isSmsTermsEnabled(), true)
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED
      else process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED = previous
    }
  })
})

describe("SMS program copy", () => {
  it("keeps the required carrier disclosures", () => {
    assert.equal(sms.SMS_TERMS_PATH, "/sms-terms")
    assert.equal(sms.SMS_PRIVACY_PATH, "/privacy")
    assert.equal(sms.SMS_RATES, "Msg & data rates may apply.")
    assert.match(sms.SMS_FREQUENCY, /Message frequency varies/)
    assert.match(sms.SMS_STOP_INSTRUCTIONS, /Reply STOP/)
    assert.match(sms.SMS_HELP_INSTRUCTIONS, /Reply HELP/)
    assert.match(sms.SMS_CARRIER_DISCLAIMER, /carriers are not liable/i)
    assert.match(sms.SMS_MESSAGE_PURPOSE, /review/)
    assert.match(sms.SMS_PRIVACY_NO_SHARING, /third parties or affiliates/)
    assert.match(sms.SMS_PRIVACY_NO_SHARING, /opt-in consent/)
    assert.match(sms.SMS_PRIVACY_NO_SHARING, /marketing/)
    assert.equal(PRACTICE_PHONE_DISPLAY, "(707) 523-3636")
  })

  it("keeps the consent method and effective date marked as pending until approval", () => {
    // Flip these assertions when Dr. Anderson confirms the wording (ops/sms-terms-launch.md).
    assert.equal(sms.SMS_CONSENT_METHOD, null)
    assert.equal(sms.SMS_TERMS_EFFECTIVE_DATE, null)
    assert.match(sms.SMS_CONSENT_PLACEHOLDER, /Placeholder pending Dr\. Anderson/)
  })

  it("contains nothing from the reference practice's program", () => {
    const copy = Object.values(sms)
      .filter((value): value is string => typeof value === "string")
      .join("\n")
    for (const foreign of ["Wong", "Palo Alto", "chriswongdds", "Christopher"]) {
      assert.equal(copy.includes(foreign), false, foreign)
    }
  })
})
