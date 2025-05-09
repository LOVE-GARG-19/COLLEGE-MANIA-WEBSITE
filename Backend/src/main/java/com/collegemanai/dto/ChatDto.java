package com.collegemanai.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatDto {

	private Integer id;
	private String chat_name;
	private String chat_image;
	
	private Boolean is_group;
	
	private List<UserDto> admins= new ArrayList<>();
	
	private UserDto created_by;

	private List<UserDto> users = new ArrayList<>();
	
	private List<MessageDto> messages=new ArrayList<>();

	
	
	
}
