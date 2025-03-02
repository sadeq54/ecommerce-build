import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega:{  //  this action allow the admin in visule mode to select the content that he want to edit in the studio and then he can see the content editor 
    studioUrl:`${process.env.NEXT_PUBLIC_BASE_URL}/studio`  
  }
})


// Purpose:
// Enables visual editing capabilities
// Allows admins to edit content directly from the frontend
// Used for the "Edit" button functionality in preview mode
// Powers the Visual Editing Interface (VEI)