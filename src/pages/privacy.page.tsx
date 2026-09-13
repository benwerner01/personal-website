import React from "react";
import { Container, Typography } from "@mui/material";
import PageHead from "../components/PageHead";

const LAST_UPDATED = "13 September 2026";

const CONTACT_EMAIL = "ben.werner01@gmail.com";

type Section = {
  heading: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    heading: "What data is accessed",
    body: (
      <>
        With explicit consent granted through Google OAuth, these scripts access
        Google Calendar events using the Google Calendar API, limited to the{" "}
        <code>calendar.events.owned</code> scope. That scope permits creating,
        updating and deleting calendar events owned by the authorizing account.
        No other Google data is accessed, and no data belonging to any other
        person is accessed.
      </>
    ),
  },
  {
    heading: "How it is used",
    body: (
      <>
        Calendar data is used solely to keep the calendar of the authorizing
        user in sync with publicly published waste-collection dates. It is never
        sold, never shared with third parties, never used for advertising, and
        never used to train any machine-learning model.
      </>
    ),
  },
  {
    heading: "Storage and retention",
    body: (
      <>
        OAuth tokens are stored only on the personal computer of the operator,
        with file permissions restricting them to that user account, and are
        transmitted to no one except Google. No calendar data is retained on any
        server. Access can be revoked at any time at{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://myaccount.google.com/permissions"
        >
          myaccount.google.com/permissions
        </a>
        , which immediately and permanently ends all access.
      </>
    ),
  },
  {
    heading: "Limited Use",
    body: (
      <>
        Use of information received from Google APIs adheres to the{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://developers.google.com/terms/api-services-user-data-policy"
        >
          Google API Services User Data Policy
        </a>
        , including its Limited Use requirements.
      </>
    ),
  },
  {
    heading: "Contact",
    body: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,
  },
];

const PrivacyPage: React.FC = () => (
  <Container>
    <PageHead
      title="Privacy Policy — My Super Apps"
      description="Privacy policy for My Super Apps, a collection of personal automation scripts that access Google Calendar with the owner's consent."
      path="/privacy"
    />
    <Typography variant="h1">Privacy Policy</Typography>
    <Typography sx={{ marginBottom: 3, fontStyle: "italic" }}>
      Last updated: {LAST_UPDATED}
    </Typography>
    <Typography sx={{ marginBottom: 3 }}>
      My Super Apps is a small collection of personal automation scripts
      operated by a single individual for their own use. It has no other users
      and is not offered as a service to anyone else.
    </Typography>
    {SECTIONS.map(({ heading, body }) => (
      <React.Fragment key={heading}>
        <Typography variant="h2" sx={{ fontSize: 28, marginBottom: 1 }}>
          {heading}
        </Typography>
        <Typography sx={{ marginBottom: 3 }}>{body}</Typography>
      </React.Fragment>
    ))}
  </Container>
);

export default PrivacyPage;
