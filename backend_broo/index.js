const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const openAiClient = new OpenAIClient(
  'https://chi-ai.openai.azure.com/',
  new AzureKeyCredential('82a95bf04b59404ba05aa61b95b772a3'),
);

app.post('/analyze-video', async (req, res) => {
  const { description } = req.body;
  console.log(description);
  try {
    const data = await analyzeVideo(description);
    res.json(data);
    console.log('Analysis results:', data);
  } catch (error) {
    console.error('Error analyzing video:', error);
    res.status(500).json({ error: 'Error analyzing video. Please try again.' });
  }
});

async function analyzeVideo(description) {
  try {
    // Define the complete prompt
    const prompt = `Problem statement: Given below the video description, go through the process given below and try to generate the captions, title, Keywords, hashtags and seo optimization rank using the step-by-step approach guided below:

        Steps:
        1. Caption:
        Customize the captions to match your brand’s tone and style.
        Ensure accuracy and readability.
         
        2. Title:
        Ensure accuracy and readability.
        Keep the title concise (around 60 characters).
        Use emotional words, intriguing questions, or powerful phrases.
        Frontload important keywords.
         
        3. Keywords:
        Focus on long-tail keywords specific to your video topic.
         
        4. Hashtags:
        Choose hashtags related to your video description.
        Generate up to 15 hashtags per video description.
        Develop a unique branded hashtag for consistency.
        Make it relevant and memorable.
         
        5.Optimised Description:
        Use the description to optimize the SEO ranking.
        Generate optimised description which results best seo than the given description give much more better results

        6. SEO Optimization:
        Generate the current SEO Rank of description.
        Also, generate the estimated SEO Rank once the above strategies are implemented.
         
        For example: Consider the below description and corresponding output.
         
       Create engaging and SEO-optimized descriptions for your YouTube videos with this free tool. Just enter your video title, category, keywords, and a few other details, and get a comprehensive description in seconds.
         
        Generate result in below format:
         
        {
            "captions": "Generate descriptions in seconds",
            "title": "Effective and efficient way of generating video descriptions",
            "keywords": ["SEO", "Optimized descriptions", "CTR"],
            "hashtags": ["#seo", "#optimization", "#videoplatform", "#clickbaits"],
            "optimised_description: "Craft captivating and SEO-enhanced narratives for your YouTube content effortlessly using our complimentary utility. Simply input your video's title, category, keywords, and additional particulars, and receive a thorough description within moments. Streamline your video optimization process today!"
            "before SEO rank (%)": "45%",
            "after SEO rank (%)": "70%"
        }
        
So now you've an example to refer!
Generate similar results for the description I'm giving below:

${description}

        `;

    // Make a request to the OpenAI API for generating content
    const { choices } = await openAiClient.getChatCompletions(
      'Chi35Turbo',
      [{ role: 'user', content: prompt }],
      { max_tokens: 200 },
    );

    // Extract generated content from the response
    const generatedContent = choices[0].message.content;
    const generatedData = JSON.parse(generatedContent);

        // Add commas after each keyword
        generatedData.keywords = generatedData.keywords.join('  ');

        // Return the modified data
        return generatedData;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
