package com.collegemanai.utils;

import com.collegemanai.model.Chat;
import com.collegemanai.model.User;

public class ChatUtil {

	public static String chatName(Chat chat,User reqUser) {

		for(User user:chat.getUsers()) {
			if(user.getId()!=reqUser.getId()) {
				return user.getUsername();

			}

		}
		return null;

	}

}