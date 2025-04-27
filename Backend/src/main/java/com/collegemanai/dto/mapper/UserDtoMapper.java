package com.collegemanai.dto.mapper;


import com.collegemanai.dto.UserDto;
import com.collegemanai.model.User;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;


@Component
public class UserDtoMapper {

	public static UserDto toUserDto(User user) {
		if (user == null) return null;
		return new UserDto(
				user.getId(),
				user.getUsername(),
				user.getName(),
				user.getImage(), // maps to userImage
				user.getEmail()
		);
	}


	public static UserDto userDTO(User user) {
		UserDto userDto=new UserDto();
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());

		return userDto;
	}
	
	public static List<UserDto> userDTOS(List<User> list){
		List<UserDto> userDtos = new ArrayList<>();

		for(User user : list) {
			UserDto userDto= userDTO(user);
			userDtos.add(userDto);
		}
		return userDtos;
	}

}
