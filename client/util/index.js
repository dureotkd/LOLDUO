// import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers } from "redux";
import { connect, Provider } from "react-redux";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Image,
  Platform,
  TextInput,
  BackHandler,
  Animated,
  Easing,
  StyleSheet,
  ToastAndroid,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";

export {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  createStore,
  Provider,
  connect,
  combineReducers,
  StatusBar,
  useEffect,
  useState,
  useRef,
  ActivityIndicator,
  ScrollView,
  MaterialCommunityIcons,
  useWindowDimensions,
  Ionicons,
  TabView,
  SceneMap,
  Image,
  useLayoutEffect,
  Platform,
  TextInput,
  Animated,
  Easing,
  BackHandler,
  StyleSheet,
  ToastAndroid,
  FlatList,
};
