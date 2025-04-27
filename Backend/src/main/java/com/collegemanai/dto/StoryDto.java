package com.collegemanai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoryDto {

	private Integer id;
	private UserDto user;
	private String image;
	private String captions;
	private LocalDateTime timestamp;
	
}
