import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RemindMeButton from '../RemindMeButton';
import SocialMediaButton from '../SocialMediaButton';
import { format } from 'date-fns'
import styles from './styles';

/**
 * interface TalkInfoProps {
  start: Date
  duration: Number
  remindMe: boolean
  isFinished: boolean
  showWhenFinished: boolean
  toggleRemindMe (): void
  onPressGithub (): void
  onPressTwitter (): void
}
 */

const exampleProps = {
  "type":"talk",
  "speaker":"Richard Threlkeld",
  "image":"richard",
  "title":"Realtime Event Processing, Streaming and Subscription for React Native Using Cloud Services",
  "description":"Designing mobile applications for different content access patterns, pub/sub, and data transformations can be challenging at scale. Leveraging cloud services effectively can help you deliver higher quality applications and new functionality in a short amount of time. In this session, you will learn how to use AWS services with React Native for implementing fine-grained access controls, event driven data transformations, message optimizations with low latencies for real-time transmission, and content streaming for uploads and downloads on lossy networks using \"Serverless\" techniques. We'll also cover when a fully JavaScript approach works in React Native and when it's necessary to drop down to native bridging.",
  "time":"7/10/2017 10:30 AM",
  "duration":"30",
  "speakerInfo": [
    {
      "name": "Richard Threlkeld",
      "twitter":"undef_obj",
      "github": "RTHRELKELD1980",
      "company":"Amazon",
      "bio":"Senior Technical Product Manager at AWS, focusing on developer experience in AWS Mobile."
    }
  ],

};

const TalkInfo = (props) => {
  const {
    // start,

    duration,

    // remindMe,
    toggleRemindMe,
    // isFinished,
    // showWhenFinished
  } = props
  // const formattedStart = format(start, 'h:mmA')
  // const showRemindMe = !isFinished
  // const showSocialMedia = isFinished && showWhenFinished

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>
            Start
          </Text>
          <Text style={styles.detailText}>
            {/* {formattedStart} */}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>
            Duration
          </Text>
          <Text style={styles.detailText}>
            {`${duration} Minutes`}
          </Text>
        </View>
      </View>
      {/* {showRemindMe &&

      } */}
      <View style={[styles.remindMe, {
        // flexDirection : 'column',
        // backgroundColor : 'green'
      }]}>
        {/* <TouchableOpacity
          style={{
            // flex : 1,
            backgroundColor : 'red',
            borderRadius : 5
          }}
          onPress={() => {
            console.log('Question Screens');
          }}
        >
          <View>
            <FontAwesome name='question' size={20} color="white" />
          </View>
        </TouchableOpacity> */}
        {/* <RemindMeButton
          onPress={() => {
            console.log('Question button');
          }}
        /> */}
        <RemindMeButton
          onPress={() => {
            console.log('Clicked Chat button');
          }}
          // on={remindMe}
        />
      </View>
      {/* {showSocialMedia &&
        <View style={styles.socialButtons}>
          {props.onPressTwitter && <SocialMediaButton network='twitter' onPress={props.onPressTwitter} /> }
          {props.onPressGithub && <SocialMediaButton network='github' onPress={props.onPressGithub} /> }
        </View>
      } */}
    </View>
  )
}
export default TalkInfo;
