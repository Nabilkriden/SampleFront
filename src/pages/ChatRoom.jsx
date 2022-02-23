import { useEffect, useState, useRef } from "react";
import "./chatRoom.css";
import SendIcon from "@mui/icons-material/Send";
import Conversation from "../components/Conversation";
import ChatButton from "../components/ChatButton";
import Messages from "../components/Messages";
import ChatOnline from "../components/ChatOnline";
import { getRoom, getMessages, sendMessages, curentUser, newRoom, deleteRoom, updateRoom } from "../service/service";
import { io } from "socket.io-client";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import ListeFrend from "../components/ListeFrend";
import { useOutletContext } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import AddRoomModal from "../components/AddRoomModal";
import AddAssistentModal from "../components/AddAssistentModal";
import ReplyIcon from "@material-ui/icons/Reply";
import { useSnackbar } from "notistack";
const ChatComponet = () => {
  const open = useOutletContext();
  const { enqueueSnackbar } = useSnackbar();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAssitentModal, setOpenAssitentModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const wrapperRef = useRef(null);
  const socket = useRef();
  const ENDPOINT = process.env.PORT || process.env.REACT_APP_DATA_SOKET_URL;
  const [value, setValue] = useState("1");
  const [showFrends, setShowFrends] = useState(false);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    open && setShowFrends(false);
    fetchConversation();
    return () => {
      socket.current.disconnect();
    };
  }, [ENDPOINT, open]);

  useEffect(() => {
    if (curentUser) {
      socket.current?.emit("addUser", curentUser._id, curentUser);
      socket.current?.on("listOfUsers", (listOfusers) => {
        setUsersOnline(listOfusers);
      });
      socket.current?.on("getMessage", (msg) => {
        setMessage([...message, msg]);
      });
      socket.current?.on("getRome", (rome) => {
        setConversation([...conversation, rome]);
      });
      socket.current?.on("romeDeleted", (rome) => {
        fetchConversation();
        if (rome._id === currentChat?._id) {
          setCurrentChat(null);
          setMessage([]);
        }
      });
    }
  }, [socket, message, conversation, currentChat]);

  useEffect(() => {
    currentChat &&
      getMessages(currentChat._id)
        .then((data) => {
          setMessage(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const fetchConversation = () => {
    getRoom()
      .then((conver) => {
        setConversation(conver);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handelChange = (event) => {
    setNewMessage(event.target.value);
  };
  const snackBar = (msg, variant) => {
    enqueueSnackbar(msg, { variant });
  };
  const onClick = () => {
    const reciverId = [];
    if (currentChat.adminRome !== curentUser._id) reciverId.push(currentChat.adminRome);
    if (currentChat.subAdmin !== curentUser._id) reciverId.push(currentChat.subAdmin);
    currentChat.assistent.forEach((element) => {
      element !== curentUser._id && !reciverId.includes(element) && reciverId.push(element);
    });
    currentChat &&
      sendMessages(newMessage, currentChat._id)
        .then((data) => {
          setMessage([...message, data.msg]);
          setNewMessage("");
          socket.current.emit("sendMessage", data.msg, reciverId);
        })
        .catch((error) => snackBar("error !", "error"));
  };

  const creatChatRomm = (subAdminEmail, romName) => {
    newRoom(subAdminEmail, romName)
      .then((rome) => {
        setConversation([...conversation, rome]);
        setCurrentChat(rome);
        setOpenModal(false);
        socket.current.emit("newRome", rome);
        snackBar("Room Created !", "success");
      })
      .catch((error) => {
        console.error(error.data);
        snackBar("error on create Room !", "error");
      });
  };

  const editRoom = (assistentEmail, roomId) => {
    updateRoom(assistentEmail, roomId)
      .then(() => {
        fetchConversation();
        setOpenAssitentModal(false);
        snackBar("Room updated !", "success");
      })
      .then((error) => {
        console.log(error);
        snackBar("error on Update Room !", "error");
      });
  };

  const removeRoom = () => {
    const v = currentChat;
    const reciverId = [];
    if (currentChat.adminRome !== curentUser._id) reciverId.push(currentChat.adminRome);
    if (currentChat.subAdmin !== curentUser._id) reciverId.push(currentChat.subAdmin);
    currentChat.assistent.forEach((element) => {
      element !== curentUser._id && reciverId.push(element);
    });
    deleteRoom(v._id)
      .then(() => {
        fetchConversation();
        setCurrentChat(null);
        setMessage([]);
        setValue("1");
        socket.current.emit("onDeleteRome", v, reciverId);
        snackBar("Room deleted !", "success");
      })
      .catch((error) => snackBar("error on delete !", "error"));
  };
  function handleListKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick();
    }
  }
  const handleRoomClick = (v) => {
    setValue("2");
    setCurrentChat(v);
  };

  const back = () => {
    setValue("1");
    setCurrentChat(null);
  };

  const onClickFrends = () => {
    setShowFrends(!showFrends);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClickOpenAssitent = () => {
    setOpenAssitentModal(true);
  };

  const handleCloseModalAssitent = () => {
    setOpenAssitentModal(false);
  };
  const roomActionButton = [{ icon: <FileCopyIcon />, name: "Add Room", onClick: () => handleClickOpen() }];
  const chatActionButton = [
    { icon: <PersonAddIcon />, name: "Add assistent", onClick: () => handleClickOpenAssitent() },
    { icon: <DeleteForeverOutlinedIcon />, name: "Delete Room", onClick: () => removeRoom(!currentChat) },
  ];
  return (
    <div className='messanger'>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          backgroundColor: "#1976d2",
        }}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}>
          <MenuIcon />
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Chat Room
        </Typography>
        <IconButton
          edge='start'
          id='userOnlineButton'
          aria-label='open drawer'
          onClick={() => onClickFrends()}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}>
          <PeopleRoundedIcon />
        </IconButton>
        {showFrends && (
          <div className='content-list' id='list'>
            <ul className='drop-list'>
              {usersOnline.map((frend, i) => (
                <div key={i} onClick={() => creatChatRomm(frend._id)}>
                  <ListeFrend frend={frend} />
                </div>
              ))}
            </ul>
          </div>
        )}
      </Toolbar>
      <div className='chat-box-body'>
        <TabContext value={value}>
          <TabPanel value='1' id='chatPannel2' className='chatMenu'>
            <ChatButton table={roomActionButton} />
            <div className='chatMenu'>
              <div className='chatMenuWrapper'>
                <div className='searchFrends' ref={wrapperRef}></div>
                {conversation.map((v, i) => (
                  <div key={i} className='conversation-list'>
                    <div style={{ flexGrow: 1 }} onClick={() => handleRoomClick(v)}>
                      <Conversation conversation={v} curentUser={curentUser} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value='2' id='chatPannel' className='chatMenu'>
            <div className='chatBox'>
              <button className='btnDeleteRoomdeleteRoom' onClick={() => back()}>
                <ReplyIcon />
                Back
              </button>
              <ChatButton table={chatActionButton} />
              <div className='chatboxWrapper'>
                <div className='chat-logs'>
                  {currentChat ? (
                    message.map((v, i) => (
                      <div ref={scrollRef} key={i}>
                        <Messages me={v.senderId === curentUser._id} message={v} />
                      </div>
                    ))
                  ) : (
                    <span className='noConversationText'>Open a conversation to start a chat.</span>
                  )}
                </div>
                <div className='chat-input-box'>
                  <input
                    id='chat-input'
                    className='chat-input'
                    onKeyDown={handleListKey}
                    value={newMessage}
                    placeholder='Send a message...'
                    onChange={handelChange}
                    disabled={currentChat ? false : true}
                  />
                  <button
                    type='button'
                    className='chat-submit'
                    id='chat-submit'
                    disabled={currentChat ? false : true}
                    onClick={() => onClick()}>
                    <SendIcon />{" "}
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
        {open && (
          <div className='chatOnline'>
            User Online
            <div className='chatOnlineWrapper'>
              {usersOnline.map(
                (user, index) =>
                  user.userData._id !== curentUser._id && (
                    <div key={index} onClick={() => creatChatRomm(user.userData._id)}>
                      <ChatOnline user={user.userData} />
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
      {openModal && <AddRoomModal close={handleCloseModal} creatChatRomm={creatChatRomm} />}
      {openAssitentModal && (
        <AddAssistentModal close={handleCloseModalAssitent} editRoom={editRoom} room={currentChat._id} />
      )}
    </div>
  );
};

export default ChatComponet;
