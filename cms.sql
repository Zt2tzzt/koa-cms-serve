/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : ltp_bi

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 01/12/2023 17:26:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `intro` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  INDEX `parentId`(`parent_id` ASC) USING BTREE,
  INDEX `leader`(`leader` ASC) USING BTREE,
  CONSTRAINT `department_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '数字中心', NULL, '丁和艳', NULL, '2023-10-19 10:40:03', '2023-11-04 17:49:19');
INSERT INTO `department` VALUES (3, '撒打发', NULL, '沙发沙发', 1, '2023-11-04 21:07:21', '2023-11-04 21:07:21');
INSERT INTO `department` VALUES (8, '会计分录', NULL, '口欸日地方都是', 3, '2023-11-05 13:48:32', '2023-11-05 13:50:43');
INSERT INTO `department` VALUES (9, '大赛分为', NULL, '与基因调控', 3, '2023-11-05 14:15:36', '2023-11-05 15:49:05');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` tinyint(1) NULL DEFAULT NULL,
  `icon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `url` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT 100,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `url`(`url` ASC) USING BTREE,
  UNIQUE INDEX `permission`(`permission` ASC) USING BTREE,
  INDEX `parentId`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '仪表板', 1, 'el-icon-data-board', NULL, '/main/analysis', NULL, 1, '2023-10-20 10:46:01', '2023-10-20 11:27:15');
INSERT INTO `menu` VALUES (2, '系统管理', 1, 'el-icon-setting', NULL, '/main/system', NULL, 2, '2023-10-20 10:47:00', '2023-10-20 11:27:19');
INSERT INTO `menu` VALUES (3, '基础数据', 1, 'el-icon-document', NULL, '/main/foundation', NULL, 3, '2023-10-20 10:48:34', '2023-10-20 11:27:21');
INSERT INTO `menu` VALUES (4, '用户管理', 2, NULL, 2, '/main/system/user', NULL, 101, '2023-10-20 10:58:48', '2023-10-23 10:14:49');
INSERT INTO `menu` VALUES (5, '创建用户', 3, NULL, 4, NULL, 'system:users:create', 301, '2023-10-20 11:00:29', '2023-10-23 10:14:46');
INSERT INTO `menu` VALUES (6, '删除用户', 3, NULL, 4, NULL, 'system:users:delete', 302, '2023-10-20 11:00:59', '2023-10-23 10:15:06');
INSERT INTO `menu` VALUES (7, '修改用户', 3, NULL, 4, NULL, 'system:users:update', 303, '2023-10-20 11:01:34', '2023-10-23 10:15:09');
INSERT INTO `menu` VALUES (8, '查询用户', 3, NULL, 4, NULL, 'system:users:query', 304, '2023-10-20 11:02:00', '2023-10-23 10:15:13');
INSERT INTO `menu` VALUES (9, '角色管理', 2, NULL, 2, '/main/system/role', NULL, 104, '2023-10-20 11:02:40', '2023-10-23 10:15:02');
INSERT INTO `menu` VALUES (10, '创建角色', 3, NULL, 9, NULL, 'system:role:create', 301, '2023-10-20 11:03:26', '2023-10-23 10:15:15');
INSERT INTO `menu` VALUES (11, '删除角色', 3, NULL, 9, NULL, 'system:role:delete', 302, '2023-10-20 11:03:37', '2023-10-23 10:15:18');
INSERT INTO `menu` VALUES (12, '修改角色', 3, NULL, 9, NULL, 'system:role:update', 303, '2023-10-20 11:04:33', '2023-10-23 10:15:20');
INSERT INTO `menu` VALUES (13, '查询角色', 3, NULL, 9, NULL, 'system:role:query', 304, '2023-10-20 11:10:38', '2023-10-23 10:15:22');
INSERT INTO `menu` VALUES (14, '部门管理', 2, NULL, 2, '/main/system/department', NULL, 102, '2023-10-20 11:11:32', '2023-10-23 10:14:55');
INSERT INTO `menu` VALUES (15, '创建部门', 3, NULL, 14, NULL, 'system:department:create', 301, '2023-10-20 11:13:22', '2023-10-23 10:15:25');
INSERT INTO `menu` VALUES (16, '删除部门', 3, NULL, 14, NULL, 'system:department:delete', 302, '2023-10-20 11:13:34', '2023-10-23 10:15:26');
INSERT INTO `menu` VALUES (17, '修改部门', 3, NULL, 14, NULL, 'system:department:update', 303, '2023-10-20 11:14:56', '2023-10-23 10:15:28');
INSERT INTO `menu` VALUES (18, '查询部门', 3, NULL, 14, NULL, 'system:department:query', 304, '2023-10-20 11:15:42', '2023-10-23 10:15:30');
INSERT INTO `menu` VALUES (19, '菜单管理', 2, NULL, 2, '/main/system/menu', NULL, 103, '2023-10-20 11:16:37', '2023-10-23 10:14:58');
INSERT INTO `menu` VALUES (20, '创建菜单', 3, NULL, 19, NULL, 'system:menu:create', 301, '2023-10-20 11:19:04', '2023-10-23 10:15:32');
INSERT INTO `menu` VALUES (21, '删除菜单', 3, NULL, 19, NULL, 'system:menu:delete', 302, '2023-10-20 11:19:15', '2023-10-23 10:15:33');
INSERT INTO `menu` VALUES (22, '修改菜单', 3, NULL, 19, NULL, 'system:menu:update', 303, '2023-10-20 11:20:20', '2023-10-23 10:15:35');
INSERT INTO `menu` VALUES (23, '查询菜单', 3, NULL, 19, NULL, 'system:menu:query', 304, '2023-10-20 11:20:41', '2023-10-23 10:15:41');
INSERT INTO `menu` VALUES (24, '核心技术', 2, NULL, 1, NULL, '/main/analysis/overview', 201, '2023-10-20 11:31:51', '2023-10-23 09:11:25');
INSERT INTO `menu` VALUES (25, '商品统计', 2, NULL, 1, NULL, '/main/analysis/dashboard', 202, '2023-10-20 11:32:14', '2023-10-23 09:11:35');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `intro` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '所有权限', '2023-10-19 10:41:56', '2023-10-19 10:41:56');
INSERT INTO `role` VALUES (9, '管理员', '用户，角色管理', '2023-10-24 13:56:14', '2023-10-24 13:56:14');
INSERT INTO `role` VALUES (10, '哈哈玛', '阿巴阿巴阿巴', '2023-11-03 20:26:39', '2023-11-04 18:07:23');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `menuId`(`menu_id` ASC) USING BTREE,
  CONSTRAINT `role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, '2023-10-20 13:35:42', '2023-10-20 13:35:42');
INSERT INTO `role_menu` VALUES (1, 2, '2023-10-20 13:35:44', '2023-10-20 13:35:44');
INSERT INTO `role_menu` VALUES (1, 3, '2023-10-20 13:35:47', '2023-10-20 13:35:47');
INSERT INTO `role_menu` VALUES (1, 4, '2023-10-20 13:36:27', '2023-10-20 13:36:27');
INSERT INTO `role_menu` VALUES (1, 5, '2023-10-20 13:39:59', '2023-10-20 13:39:59');
INSERT INTO `role_menu` VALUES (1, 6, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 7, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 8, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 9, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 10, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 11, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 12, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 13, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 14, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 15, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 16, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 17, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 18, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 19, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 20, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 21, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 22, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 23, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 24, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (1, 25, '2023-10-20 13:40:44', '2023-10-20 13:40:44');
INSERT INTO `role_menu` VALUES (9, 2, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 4, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 5, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 6, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 7, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 8, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 9, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 10, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 11, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 12, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 13, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 14, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 15, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 16, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 17, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (9, 18, '2023-10-24 14:06:42', '2023-10-24 14:06:42');
INSERT INTO `role_menu` VALUES (10, 1, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 2, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 14, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 15, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 16, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 17, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 18, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 19, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 20, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 21, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 22, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 23, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 24, '2023-11-04 18:07:23', '2023-11-04 18:07:23');
INSERT INTO `role_menu` VALUES (10, 25, '2023-11-04 18:07:23', '2023-11-04 18:07:23');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `cellphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `enable` tinyint NULL DEFAULT NULL,
  `role_id` int NULL DEFAULT NULL,
  `realname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `department_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `department_id`(`department_id` ASC) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'coderzzt', 'e10adc3949ba59abbe56e057f20f883e', '2023-10-17 15:20:05', '2023-10-19 11:23:57', NULL, '13077018257', 1, 1, 'coderzzt', 1);
INSERT INTO `user` VALUES (15, 'erty', 'e35cf7b66449df565f93c607d5a81d09', '2023-10-22 16:04:17', '2023-10-22 17:02:05', NULL, '123456', 0, 1, 'yui', 1);
INSERT INTO `user` VALUES (17, 'tyh', 'e130e5e618f15cee7a519d8b7b8306a0', '2023-10-22 16:35:19', '2023-10-22 16:35:19', NULL, 'dfsdf', 1, 1, 'sdfsd', 1);
INSERT INTO `user` VALUES (23, 'lyh', 'e10adc3949ba59abbe56e057f20f883e', '2023-10-24 13:56:39', '2023-11-04 18:05:32', NULL, '12345678922', 1, 9, '李银河', 1);
INSERT INTO `user` VALUES (25, 'hgdfs', 'e10adc3949ba59abbe56e057f20f883e', '2023-11-03 21:01:16', '2023-11-05 14:01:32', NULL, '12885667', 0, 10, 'abmmba', 1);
INSERT INTO `user` VALUES (27, 'ksodjfposjfd', 'e10adc3949ba59abbe56e057f20f883e', '2023-11-04 21:07:58', '2023-11-04 21:07:58', NULL, '123456', 1, 10, '试点范围', 3);
INSERT INTO `user` VALUES (28, 'cxcv', 'e10adc3949ba59abbe56e057f20f883e', '2023-11-05 14:00:58', '2023-11-05 14:00:58', NULL, '123456', 1, 10, '金额哦i', 8);
INSERT INTO `user` VALUES (29, 'ieroijf', 'e10adc3949ba59abbe56e057f20f883e', '2023-11-05 14:01:25', '2023-11-05 14:01:25', NULL, '123456', 1, 10, 'i无阿发生的', 3);

SET FOREIGN_KEY_CHECKS = 1;
