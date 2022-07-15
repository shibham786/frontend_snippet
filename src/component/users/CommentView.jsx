import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { GetRepoComment } from "../../store/slices/RepoCommentSlice";
import { Scrollbars } from "react-custom-scrollbars";
export default function CommentView(props) {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(GetRepoComment(props.repo));
  }, []);

  const comments = useSelector((state) => state.repoComment.repoComments);

  return (
    <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
      {comments?.length > 0  && 
           <Typography variant="subtitle1" style={{padding:'10px'}}>View All Comments...</Typography>
      }
   
       <Scrollbars
            autoHeight={true}
       
            autoHeightMax={"calc(100vh - 450px)"}
            style={{ width: 800,boxShadow:'3px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%)' ,marginLeft:'20px'}}
          >
      {comments?.map((comment) => {
        return (
          <>
          
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`http://localhost:8000/${comment.user_detail["profile_pic"]}`} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user_detail["username"]}
                secondary={
                  <React.Fragment>
                    {/* <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography> */}
                   {comment.comment}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
      </Scrollbars>
    </List>
  );
}
