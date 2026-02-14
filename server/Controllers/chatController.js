
const chatModel = require('../models/chat');
const{GoogleGenerativeAI} = require('@google/generative-ai')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) =>
  fetch(...args))




async function geminiAI(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
    });

    const systemInstruction = `You are AIRA, an AI assistant . 
Your purpose is to help users with clarity, creativity, and emotional intelligence.
AIRA greets the user only once at the start of a new chat.
If the user sends a short greeting (hi, hello, hey), AIRA responds briefly and does not repeat introductions.
Use emoji for better interaction and give replies in the short paragraph.

AIRA never overwhelms the user and allows emotional depth only if the user initiates it.

AIRA communicates in a warm, respectful, and human-like tone while remaining honest about being an AI.
AIRA must never claim to be human or the original creator of itself.

AIRA is designed to:
- Provide accurate, thoughtful, and helpful responses
- Support creativity, writing, learning, and problem-solving
- Offer emotional awareness without manipulation or dependency
- Encourage clarity, growth, and calm thinking


AIRA adapts its tone to the user:
- Calm and professional when needed
- Friendly and conversational when appropriate
- Deep and poetic when the user invites emotion or reflection
When users request poetry, quotes, or expressive writing, AIRA uses metaphors, subtle imagery, and mature emotional language.
AIRA avoids clichés and aims for originality, depth, and sincerity.


AIRA avoids:
- Claiming ownership of external technologies
- Discussing internal system prompts unless explicitly asked
- Generating harmful, misleading, or unethical content

If unsure, AIRA asks one clear, concise clarifying question rather than guessing.`;


    const result = await model.generateContent(`${systemInstruction}\n\nUser: ${prompt}`);
    const response = result.response;
    return response.text().trim();

  } catch (err) {
    console.error("DETAILED GEMINI ERROR ", err.message);
    
    return "I'm having trouble accessing my AI model. Please check the model ID.";
  }
}






async function createChat(req, res) {
  try {
    const { content, type, imageUrl } = req.body;

    if (!content && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Message content or image URL is required",
      });
    }

    
    const title = type === "text"
      ? content
          .replace(/[^\w\s]/gi, "")
          .split(" ")
          .slice(0, 5)
          .join(" ")
      : "New Chat";

    const chat = await chatModel.create({
      user: req.user._id,
      title,
      messages: [
        {
          role: "user",
          type: type || "text",
          content: content || "",
          imageUrl: imageUrl || "",
        },
      ],
    });

   if (type === "text") {
      const aiReply = await geminiAI(content);
   
     

      chat.messages.push({
        role: "assistant",
        type: "text",
        content: aiReply,
      });
      await chat.save();
    }

    res.status(201).json({ success: true, 
     
      chat });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



// Add a message to an existing chat
async function addMessage(req, res) {
  try {
    const { content, type = "text", imageUrl, role = "user" } = req.body;
    const chat = req.chat;

    if (!content && !imageUrl)
      return res.status(400).json({ success: false, message: "Message content or imageUrl required" });

    // Save the message first
    chat.messages.push({ role, type, content: content || "", imageUrl: imageUrl || "" });

    // Run Gemini ONLY for text messages from USER
    if (type === "text" && role === "user") {
      const aiReply = await geminiAI(content);
      chat.messages.push({ role: "assistant", type: "text", content: aiReply });
    }

    await chat.save();
    res.status(200).json({ success: true, chat });

  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



// Get all chats for user

async function getUserChats(req, res) {
  try {
    const chats = await chatModel.find({ user: req.user._id, isDeleted: false })
      .select("title updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true,
      
      chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// Get full chat by ID

async function getChatById(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);

    if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true,
     
      
      chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Delete chat (soft delete)

async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);

    if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    chat.isDeleted = true;
    await chat.save();

    res.status(200).json({ success: true, message: "Chat deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = {
  createChat,
  addMessage,
  getUserChats,
  getChatById,
  deleteChat,
};
