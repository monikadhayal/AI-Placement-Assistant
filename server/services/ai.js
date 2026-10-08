 //  AI API call yahin se
 // is file me ye kaam h ki me google ko request(resume) bej rehe huu or google muje us ka answer de reha h 
 const askAI = async (systemPrompt, userPrompt) => {
   const model = process.env.AI_MODEL;

   const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

   const response = await fetch(url, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "x-goog-api-key": process.env.AI_API_KEY,
     },
     body: JSON.stringify({
       system_instruction: {
         parts: [{ text: systemPrompt }],
       },
       contents: [
         {
           role: "user",
           parts: [{ text: userPrompt }],
         },
       ],
     }),
   });

   const data = await response.json();
   console.log("AI RESPONSE:", JSON.stringify(data, null, 2));
   const text = data.candidates[0].content.parts[0].text;
   return text;
 };

 module.exports = askAI;
