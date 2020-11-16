const sanityClient = require('@sanity/client')

const archisetSanityClient = sanityClient({
  projectId: 'zfj19yc4',
  dataset: 'production',
  useCdn: true
})

export default archisetSanityClient;