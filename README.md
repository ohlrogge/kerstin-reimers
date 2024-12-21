# Kerstin Reimers

An online gallery for the works of Kerstin Reimers. Hosted on [kerstinreimers.de](https://kerstinreimers.de).

## Contributing

If you would like to contribute to the site, you can do so by creating a pull request.

## Development

For development purposes, you can run the site locally using Hugo. To do so, you need to have Hugo installed on your machine. You can find instructions on how to install Hugo [here](https://gohugo.io/documentation/).

## Deployment

The site is deployed using Cloudflare Pages.

A pull request triggers a preview deployment. The result can be viewed by following the link provided in the pull request.

The deployment is triggered automatically when changes are pushed to the `main` branch.

### Cloudflare Pages Configuration

#### Domain Hosting

Cloudflare doesn't support buying `.de` domains. But it's possible to add a `.de` domain to Cloudflare if it's already bought from another provider as long as the provider allows control over the external name server settings.

#### Deployment Steps

1. Add Domain
   - Add your domain to Cloudflare.
   - Ensure you have control over the external name server settings.

2. Create Deployment
   - Navigate to Workers & Pages in Cloudflare.
   - Create a new deployment and choose the repository and branch to deploy from.
   - Cloudflare will automatically connect to the repository and initialize the deployment setup.

3. Adjust Deployment Settings
   - Change Build Command
     - Set the build command to a custom command: `hugo -b $CF_PAGES_URL`.
     - This changes the base URL, ensuring that media files are loaded correctly, especially for preview deployments.
   - Set Environment Variables
     - Override `CF_PAGES_URL` for `Production` environment
       - Add a variable `CF_PAGES_URL` in `Production` environment settings.
       - The value should be the domain name, e.g., `https://kerstinreimers.de`.
     - Set `HUGO_VERSION`
       - Add a variable `HUGO_VERSION` in `Production` environment settings
       - Add a variable `HUGO_VERSION` in `Preview` environment settings
       - The value should be the version used in the project, e.g., `0.140.0`. This ensures that an incompatible older version is not used.

## Links

- [Website](https://kerstinreimers.de)
- [Hugo](https://gohugo.io)
- Theme is a customized version of the [Hugo Gallery Theme](https://github.com/nicokaiser/hugo-theme-gallery) by [Nico Kaiser](https://github.com/nicokaiser)
