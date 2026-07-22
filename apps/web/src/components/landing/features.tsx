import React from "react";
import Feature from "../feature";

export default function Features() {
  return (
    <section className="container mx-auto space-y-6 px-4 py-6 sm:space-y-10 sm:px-6 sm:py-10 md:space-y-12 lg:px-8">
      <Feature
        title="Describe your store"
        description="Stride allows you to describe your store in your own words. Our AI will analyze your store and provide you with a comprehensive report on its strengths and weaknesses."
        image="/feat1.png"
      />
      <Feature
        title="Select and Describe your Customers"
        description="Describe your target customers in detail. Provide information about their demographics, psychographics, behavior, and needs."
        image="/feature2.png"
      />
      <Feature
        title="Let AI Analyze your store"
        description="At this point sit back and relax while AI does the analysis for you."
        image=""
      />
      {/* <Feature
           title='Save Review for later'
           description='Finally review the analysis and iterate over the changes you want to make to your store.'
           image=''
           /> */}
    </section>
  );
}
