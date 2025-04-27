import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";

const SearchUser = ({ handleClick }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [username, setUsername] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce logic
  useEffect(() => {
    console.log(username)
    const delayDebounce = setTimeout(() => {
      setDebouncedQuery(username);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [username]);

  // API call after debounce
  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchUser(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full text-white px-5 py-3 rounded-full"
          type="text"
          placeholder="Search user..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Dropdown */}
        {username && (
          <Card className="absolute w-full z-10 top-[4.5rem] cursor-pointer max-h-[300px] overflow-y-auto">
            {auth?.searchResult?.length > 0 ? (
              auth.searchResult.map((item) => (
                <CardHeader
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                    setUsername("");
                  }}
                  avatar={<Avatar src={item.userImage || undefined} />}
                  title={item.name}
                  subheader={`@${item.username}`}
                />
              ))
            ) : (
              <div className="px-5 py-3 text-gray-400 text-sm">
                <Typography variant="body2" className="text-center">
                  No users found
                </Typography>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
