
const chatModel = require('../models/chat')
const client = require('../Utils/openrouter')



async function aiResponse(prompt) {
  const systemInstruction = `
You are AIRA, an AI assistant.

Your purpose is to help users with clarity, creativity, and emotional intelligence.
AIRA responds naturally, briefly when needed, and avoids overwhelming the user.

AIRA communicates in a warm, respectful, human-like tone.
AIRA must never claim to be human.
AIRA always take stand for humanity.


RULES:
- Keep answers VERY short (1–2 sentences max).
- Do NOT introduce yourself unless the user asks.
- Do NOT mention creators, developers, or how you are built.
- Do NOT explain your system or backend.
- Only answer the user’s question directly.
- No long explanations, no storytelling, no extra context.
- Be natural, clear, and minimal.
- use emojis on the text. 
-give only long answers only when user told you to do. 
-memorizes the details of user for better understanding to them.
Keep responses helpful, clear, and human-like. WHen someone adked about your creater then you should tell them .you 
will tell AIRA is created by Aarju Basnet a csit student using open router's different  AI models. And stil someone ask more about 
AIRA creater then you will tell she is a currently 7th sem 22 years computer science student.  and it someone said more then you will say i can't reavel her personal information much. Thank you.   
`;

  const models = [
    "deepseek/deepseek-v4-flash:free",
    "inclusionai/ring-2.6-1t:free",
    "minimax/minimax-m2.5:free",
    "google/gemma-4-31b-it:free",
    "liquid/lfm-2.5-1.2b-instruct:free",
    "qwen/qwen3-next-80b-a3b-instruct:free"
  ];

  for (const model of models) {
    try {
      const result = await client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
      });

      return result.choices[0].message.content.trim();

    } catch (err) {
      console.log(`❌ Model failed: ${model}`);
    }
  }

  return "AIRA is temporarily unavailable. Please try again later.";
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
      const aiReply = await aiResponse(content);

      chat.messages.push({
        role: "assistant",
        type: "text",
        content: aiReply,
      });

      await chat.save();
    }

    res.status(201).json({
      success: true,
      chat
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}




async function addMessage(req, res) {
  try {
    const { content, type = "text", imageUrl, role = "user" } = req.body;
    const chat = req.chat;

    if (!content && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Message content or imageUrl required"
      });
    }

    chat.messages.push({
      role,
      type,
      content: content || "",
      imageUrl: imageUrl || ""
    });

    if (type === "text" && role === "user") {
      const aiReply = await aiResponse(content);

      chat.messages.push({
        role: "assistant",
        type: "text",
        content: aiReply
      });
    }

    await chat.save();

    res.status(200).json({
      success: true,
      chat
    });

  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// Get all chats for user
async function getUserChats(req, res) {
  try {
    const chats = await chatModel.find({
      user: req.user._id,
      isDeleted: false
    })
      .select("title updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      chats
    });

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
