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

## YouTube Integration

To display your latest YouTube videos on the homepage, you'll need to set up the YouTube Data API:

1. **Get a YouTube API Key:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)

2. **Find your Channel ID:**

   - Go to your YouTube channel
   - The channel ID is in the URL: `https://www.youtube.com/channel/CHANNEL_ID`
   - Or find it in your channel settings

3. **Set Environment Variables:**
   Create a `.env.local` file in the root directory with:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

The YouTube section will automatically fetch and display your 6 most recent videos with thumbnails, titles, descriptions, and durations.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
