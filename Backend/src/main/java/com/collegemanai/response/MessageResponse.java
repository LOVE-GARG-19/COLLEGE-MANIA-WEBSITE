package com.collegemanai.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageResponse {
	
	private String message;
	


	@Override
	public String toString() {
		return "MessageResponse [message=" + message + "]";
	}

}
