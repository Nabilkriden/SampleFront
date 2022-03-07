export default function Conversation({ conversation, curentUser }) {
  return (
    <div className='conversation'>
      <span className='conversationName'>{conversation.roomName} </span>
    </div>
  );
}
