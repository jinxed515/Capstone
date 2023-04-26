import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Card, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"

export const NavigationScreen: FC<DemoTabScreenProps<"Navigate">> = function NavigationScreen(
  _props,
) {
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="NavigationScreen.title" style={$title} />
      <Text tx="NavigationScreen.tagLine" style={$tagline} />
      <Card
        heading="The google-maps map"
        content="This should show the layout"
        style={{ minHeight: 360 }}
      />
      <TextField label="Source Address" value="MG Road" placeholder="Text goes here" />
      <TextField label="Destination address" value="Home" placeholder="Text goes here" />
    
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $tagline: TextStyle = {
  marginBottom: spacing.huge,
}
