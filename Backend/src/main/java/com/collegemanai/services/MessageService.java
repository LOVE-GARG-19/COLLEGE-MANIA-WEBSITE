package com.collegemanai.services;

import com.collegemanai.exception.ChatException;
import com.collegemanai.exception.MessageException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Message;
import com.collegemanai.request.SendMessageRequest;

import java.util.List;

public interface MessageService {
	
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;
	
	public List<Message> getChatsMessages(Integer chatId) throws ChatException;
	
	public Message findMessageById(Integer messageId) throws MessageException;
	
	public String deleteMessage(Integer messageId) throws MessageException;

}
