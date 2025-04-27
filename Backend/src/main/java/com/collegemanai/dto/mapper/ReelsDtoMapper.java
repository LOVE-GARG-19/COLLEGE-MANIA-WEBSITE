package com.collegemanai.dto.mapper;

import com.collegemanai.dto.ReelsDto;
import com.collegemanai.dto.UserDto;
import com.collegemanai.model.Reels;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReelsDtoMapper {


	public static ReelsDto toReelsDto(Reels reel) {
		ReelsDto reelsDto = new ReelsDto();

		UserDto user = UserDtoMapper.userDTO(reel.getUser());

		reelsDto.setTitle(reel.getTitle());
		reelsDto.setUser(user);
		reelsDto.setVideo(reel.getVideo());
		reelsDto.setId(reel.getId()); // clean and consistent

		return reelsDto;
	}
	
	public static List<ReelsDto> toReelsDtos(List<Reels> reels){
		
		List<ReelsDto> reelsDtos=new ArrayList<>();
		
		for(Reels reel : reels ) {
			 ReelsDto reelsDto=toReelsDto(reel);
			 reelsDtos.add(reelsDto);
		}
		
		return reelsDtos;
		
	}





}
