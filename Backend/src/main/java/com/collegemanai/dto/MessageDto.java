package com.collegemanai.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {

	private String content;
	private String image;
	private Integer id;
	private LocalDateTime timeStamp;
	private Boolean is_read;
	private UserDto user;
	private ChatDto chat;
	
	
	
	
	
}
