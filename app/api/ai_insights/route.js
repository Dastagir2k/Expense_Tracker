import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get('userId'));

    const categories = await prisma.category.findMany({
      where: { userId: userId }, // replace with actual userId
      include: {
        expenses: true,
      },
    });
    
    // Calculate total spent for each category
    categories.forEach(category => {
      category.totalSpent = category.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    });
    console.log(categories);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.GEMINI_URL);
  

    // Create prompt for Gemini AI
    const prompt = `Analyze these expense details and provide insights:
    ${JSON.stringify(categories, null, 2)}
    
    Please provide:
    1. Overview of spending patterns
    2. Categories approaching or exceeding limits
    3. Unusual spending patterns
    4. Recommendations for budget management

   Assume you are Finance Minister and user is your client user calling you for help and advice and from you he is expecting insights and recommendations. 

   The response should be structured as follows:
   {
       "date": "YYYY-MM-DD",
       "client": "User  ID X",
       "subject": "Financial Overview and Budget Management Recommendations",
       "analysis": {
           "spendingPatterns": [
               {
                   "category": "Category Name",
                   "description": "Description of spending pattern.",
                   "amount": Amount
               },
               // Additional spending patterns...
           ],
           "categoriesApproachingOrExceedingLimits": [
               {
                   "category": "Category Name",
                   "limit": Amount,
                   "spent": Amount,
                   "percentage": Percentage,
                   "notes": "Notes regarding the spending."
               }
           ],
           "unusualSpendingPatterns": [
               {
                   "description": "Description of unusual spending.",
                   "recommendation": "Recommendation for addressing this spending."
               }
           ]
       },
       "recommendations": [
           {
               "item": "Recommendation Item",
               "details": "Details about the recommendation."
           }
           // Additional recommendations...
       ]
   }`;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if (!model) {
            console.error("Model initialization failed.");
            return res.status(500).json({ error: "Model not available." });
        }

        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            console.error("Invalid response from model.");
            return res.status(500).json({ error: "Error generating optimized code." });
        }

        let text = result.response.text();
        console.log("Raw Generated Insights:", text);
  
        
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
       
        const insights = JSON.parse(text);
  
        return NextResponse.json(insights);
      return NextResponse.json(insights);
    } catch (error) {
        console.error("Error optimizing code:", error.message);
      
    }

   
  } catch (error) {
    console.error('AI Insights Error:', error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}