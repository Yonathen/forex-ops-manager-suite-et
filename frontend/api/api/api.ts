export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './branchController.service';
import { BranchControllerService } from './branchController.service';
export * from './testController.service';
import { TestControllerService } from './testController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthControllerService, BranchControllerService, TestControllerService, UserControllerService];
