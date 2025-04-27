package com.collegemanai.dto.mapper;

import com.collegemanai.dto.StoryDto;
import com.collegemanai.dto.UserDto;
import com.collegemanai.model.Story;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StoryDtoMapper {

    public static StoryDto toStoryDto(Story story) {
        UserDto userDto = UserDtoMapper.toUserDto(story.getUser());
        StoryDto dto = new StoryDto();
        dto.setId(story.getId());
        dto.setImage(story.getImage());
        dto.setCaptions(story.getCaptions());
        dto.setTimestamp(story.getTimestamp());
        dto.setUser(userDto);

        return dto;
    }

    public static List<StoryDto> toStoryDtos(List<Story> stories) {
        List<StoryDto> dtos = new ArrayList<>();
        for (Story story : stories) {
            dtos.add(toStoryDto(story));
        }
        return dtos;
    }
}
