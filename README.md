This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form configuration

The contact form on `/contact` sends submissions to the `/api/contact` route, which forwards the message to
`hello@snappytails.com` using the [Resend](https://resend.com) email API. Configure the following environment variables in a
`.env.local` file before running the project:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="Snappy Tales <no-reply@your-domain.com>"
# Optional: override the default recipient list
CONTACT_TO_EMAIL="hello@snappytails.com"
```

The `CONTACT_TO_EMAIL` value accepts a comma-separated list if you need to notify multiple recipients. The form will display a
toast confirmation when the message is delivered and surfaces any validation or delivery errors returned by the API.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
