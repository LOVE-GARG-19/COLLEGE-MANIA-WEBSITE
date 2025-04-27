package com.collegemanai.model;

import jakarta.persistence.*;

//import com.zos.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reels {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String caption;
	private String title;
	private String video;

@ManyToOne
@JoinColumn(name = "user_id") // foreign key column
private User user;

}
