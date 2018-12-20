



class TalkDetail extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
      <Image source={focused ? Images.activeScheduleIcon : Images.inactiveScheduleIcon} />
    )
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.goBack)
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  renderSpeaker = (speaker, index) => {
    return (
      <View key={index}>
        <Text style={styles.heading}>
          {speaker.name}
        </Text>
        <Text style={styles.description}>
          {speaker.bio}
        </Text>
        <View style={styles.social}>
          { speaker.twitter &&
            <SocialMediaButton
              network='twitter'
              spacing='right'
              onPress={() => this.props.onPressTwitter(speaker.twitter)}
            />
          }
          { speaker.github &&
            <SocialMediaButton
              network='github'
              spacing='right'
              onPress={() => this.props.onPressGithub(speaker.github)}
            />
          }
        </View>
      </View>
    )
  }

  isSpecial = () => contains(this.props.title, this.props.specialTalks)

  renderSpeakers = () => {
    const { speakerInfo } = this.props

    return (speakerInfo.map((speaker, index) => this.renderSpeaker(speaker, index)))
  }

  render () {
    const {title, eventStart, setReminder, removeReminder} = this.props
    return (
      <PurpleGradient style={styles.linearGradient}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
              <Image style={styles.backButtonIcon} source={Images.arrowIcon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.cardShadow1} />
            <View style={styles.cardShadow2} />
            <Image
              style={styles.avatar}
              source={{uri: `https://infinite.red/images/chainreact2017/${this.props.image}.png`}}
            />
            <View style={styles.card}>
              <Text style={styles.sectionHeading}>
                TALK
              </Text>
              <Text style={styles.heading}>
                {this.props.title}
              </Text>
              <Text style={styles.description}>
                {this.props.description}
              </Text>
              <Text style={styles.sectionHeading}>
                ABOUT
              </Text>
              {this.renderSpeakers()}
            </View>
            <TalkInfo
              start={new Date(this.props.eventStart)}
              duration={Number(this.props.duration)}
              remindMe={this.isSpecial()}
              toggleRemindMe={SBHelper.toggleReminder(title, eventStart, this.isSpecial(), setReminder, removeReminder)}
              onPressGithub={this.props.onPressGithub}
              onPressTwitter={this.props.onPressTwitter}
              isFinished={this.props.currentTime > this.props.eventStart}
              showWhenFinished={false}
            />
          </View>
        </ScrollView>
      </PurpleGradient>
    )
  }
}