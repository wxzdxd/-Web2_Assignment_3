/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 13/10/2024 01:15:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int(0) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Education');
INSERT INTO `category` VALUES (2, 'Health');
INSERT INTO `category` VALUES (3, 'Environment');
INSERT INTO `category` VALUES (4, 'AnimalWelfare');
INSERT INTO `category` VALUES (5, 'DisasterRelief');

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `DONATION_ID` int(0) NOT NULL AUTO_INCREMENT,
  `DATE` datetime(0) NOT NULL,
  `AMOUNT` decimal(10, 2) NOT NULL,
  `GIVER` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FUNDRAISER_ID` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`DONATION_ID`) USING BTREE,
  INDEX `FUNDRAISER_ID`(`FUNDRAISER_ID`) USING BTREE,
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (21, '2024-10-12 00:00:00', 12000.00, 'Alice Johnson', 1);
INSERT INTO `donation` VALUES (22, '2024-10-12 00:00:00', 30000.00, 'Michael Smith', 2);
INSERT INTO `donation` VALUES (23, '2024-10-12 00:00:00', 25000.00, 'Jessica Brown', 3);
INSERT INTO `donation` VALUES (24, '2024-10-12 00:00:00', 18000.00, 'David Wilson', 4);
INSERT INTO `donation` VALUES (25, '2024-10-12 00:00:00', 15000.00, 'Emily Davis', 15);
INSERT INTO `donation` VALUES (26, '2024-10-12 00:00:00', 22000.00, 'James Miller', 11);
INSERT INTO `donation` VALUES (27, '2024-10-12 00:00:00', 50000.00, 'Sarah Taylor', 2);
INSERT INTO `donation` VALUES (28, '2024-10-12 00:00:00', 35000.00, 'Daniel Anderson', 3);
INSERT INTO `donation` VALUES (29, '2024-10-12 00:00:00', 13000.00, 'Sophia Thomas', 14);
INSERT INTO `donation` VALUES (30, '2024-10-12 00:00:00', 40000.00, 'Robert Jackson', 5);
INSERT INTO `donation` VALUES (31, '2024-10-12 00:00:00', 20000.00, 'Emma White', 1);
INSERT INTO `donation` VALUES (32, '2024-10-12 00:00:00', 45000.00, 'William Harris', 12);
INSERT INTO `donation` VALUES (33, '2024-10-12 00:00:00', 19000.00, 'Olivia Martin', 6);
INSERT INTO `donation` VALUES (34, '2024-10-12 00:00:00', 25000.00, 'Liam Thompson', 14);
INSERT INTO `donation` VALUES (35, '2024-10-12 00:00:00', 30000.00, 'Ava Garcia', 10);
INSERT INTO `donation` VALUES (36, '2024-10-12 00:00:00', 24000.00, 'Noah Martinez', 7);
INSERT INTO `donation` VALUES (37, '2024-10-12 00:00:00', 22000.00, 'Isabella Robinson', 1);
INSERT INTO `donation` VALUES (38, '2024-10-12 00:00:00', 16000.00, 'Mason Clark', 13);
INSERT INTO `donation` VALUES (39, '2024-10-12 00:00:00', 28000.00, 'Sophia Lewis', 8);
INSERT INTO `donation` VALUES (40, '2024-10-12 00:00:00', 35000.00, 'Ethan Lee', 9);
INSERT INTO `donation` VALUES (41, '2024-10-12 17:30:00', 1500.00, 'John Yhh', 10);

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int(0) NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TARGET_FUNDING` decimal(10, 2) NOT NULL,
  `CURRENT_FUNDING` decimal(10, 2) NOT NULL,
  `CITY` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL DEFAULT 1,
  `CATEGORY_ID` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `CATEGORY_ID`(`CATEGORY_ID`) USING BTREE,
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Alice Johnson', 'dddd', 10000.00, 20000.00, 'Sydney', 1, 1);
INSERT INTO `fundraiser` VALUES (2, 'Jane Smith', 'Cancer Treatment for Children', 50000.00, 20000.00, 'Melbourne', 1, 2);
INSERT INTO `fundraiser` VALUES (3, 'Green Earth Foundation', 'Planting Trees in Urban Areas', 15000.00, 8000.00, 'Brisbane', 1, 3);
INSERT INTO `fundraiser` VALUES (4, 'Animal Lovers', 'Save Endangered Koalas', 30000.00, 12000.00, 'Adelaide', 1, 4);
INSERT INTO `fundraiser` VALUES (5, 'Disaster Relief Fund', 'Help Flood Victims in Queensland', 25000.00, 18000.00, 'Perth', 1, 5);
INSERT INTO `fundraiser` VALUES (6, 'James Oliver', 'Scholarship for Underprivileged Students', 20000.00, 10000.00, 'Canberra', 1, 1);
INSERT INTO `fundraiser` VALUES (7, 'Susan Wright', 'Medical Supplies for Remote Communities', 40000.00, 15000.00, 'Hobart', 1, 2);
INSERT INTO `fundraiser` VALUES (8, 'Ocean Cleaners', 'Clean the Great Barrier Reef', 35000.00, 16000.00, 'Cairns', 1, 3);
INSERT INTO `fundraiser` VALUES (9, 'Wildlife Rescue', 'Protect Tasmanian Devils', 15000.00, 7000.00, 'Hobart', 1, 4);
INSERT INTO `fundraiser` VALUES (10, 'Flood Support', 'Help Cyclone Victims in Northern Territory', 30000.00, 25000.00, 'Darwin', 1, 5);
INSERT INTO `fundraiser` VALUES (11, 'Emma Thompson', 'Build Libraries in Rural Areas', 12000.00, 6000.00, 'Sydney', 1, 1);
INSERT INTO `fundraiser` VALUES (12, 'Healthy Life Org', 'Provide Free Health Checkups for Elderly', 50000.00, 30000.00, 'Melbourne', 1, 2);
INSERT INTO `fundraiser` VALUES (13, 'Eco Warriors', 'Reduce Plastic Waste in Sydney Beaches', 18000.00, 8000.00, 'Sydney', 1, 3);
INSERT INTO `fundraiser` VALUES (14, 'Koala Guardians', 'Plant Eucalyptus Trees for Koalas', 22000.00, 9000.00, 'Brisbane', 1, 4);
INSERT INTO `fundraiser` VALUES (15, 'Emergency Relief Team', 'Assist Bushfire Victims in Victoria', 45000.00, 20000.00, 'Melbourne', 1, 5);
INSERT INTO `fundraiser` VALUES (16, 'Alice Johnson', 'dddd', 10000.00, 20000.00, 'Sydney', 0, 1);

SET FOREIGN_KEY_CHECKS = 1;
