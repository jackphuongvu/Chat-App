import md5 from 'md5'

export function prepareMessages(messages) {
  return {
    keys: messages.map(m => {
      if(!m._id && m.id){
        m._id = m.id;
      };
      return m._id;
    }),
    blob: messages.reduce((o, m, i) => {
      // const previousMessage = messages[i + 1] || {};
      // const nextMessage = messages[i - 1] || {};
      // // add next and previous messages to hash to ensure updates
      // if(!previousMessage._id && previousMessage.id){
      //   previousMessage._id = previousMessage.id;
      // }
      // if(!nextMessage._id && nextMessage.id){
      //   nextMessage._id = nextMessage.id;
      // }
      // const toHash = JSON.stringify(m) + previousMessage._id + nextMessage._id;
      o[m._id] = {
        ...m,
        // previousMessage,
        // nextMessage,
        // hash: md5(toHash)
      };
      return o;
    }, {})
  };
}

export const editMessages = (messages) => {
  return messages.map(m => {
    if(!m._id && m.id){
      m._id = m.id;
    };
    return m;
  })
}

