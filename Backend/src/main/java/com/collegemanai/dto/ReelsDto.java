package com.collegemanai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReelsDto {

	private Integer id;
	private String title;
	private String video;
	
	private UserDto user;

}
