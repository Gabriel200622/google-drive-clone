import type { Request, Response } from "express";
import { FolderRepository } from "../../domain";
import { responseHandler } from "../../utils";
import {
  CreateFolder,
  DeleteFolder,
  FolderDto,
  GetFolder,
  GetFolders,
} from "../../domain";
import { GetFolderTree } from "../../domain/use-cases/folder/get-folder-tree";

export class FolderController {
  constructor(private readonly folderRepository: FolderRepository) {}

  public createFolder = async (req: Request, res: Response) => {
    try {
      const { name, folderId } = req.body;

      if (req.user) {
        const folder = new FolderDto({
          name: name,
          userId: req.user.id,
          folderId: folderId ? folderId : undefined,
        });

        new CreateFolder(this.folderRepository)
          .execute(folder)
          .then((folder) => {
            return responseHandler({
              data: folder,
              status: 200,
              msg: "success",
              res: res,
            });
          })
          .catch((error) =>
            responseHandler({
              data: null,
              status: 401,
              msg: error.message,
              error: error,
              res: res,
            })
          );
      }
    } catch (error) {
      return responseHandler({
        data: null,
        status: 500,
        msg: "Something went wrong",
        error: error,
        res: res,
      });
    }
  };

  public getFolder = async (req: Request, res: Response) => {
    try {
      const { folderId } = req.params;

      if (req.user) {
        new GetFolder(this.folderRepository)
          .execute(req.user.id, folderId)
          .then((folder) => {
            if (folder) {
              return responseHandler({
                data: folder,
                status: 200,
                msg: "success",
                res: res,
              });
            } else {
              return responseHandler({
                status: 404,
                msg: "Folder not found",
                res: res,
              });
            }
          })
          .catch((error) =>
            responseHandler({
              data: null,
              status: 401,
              msg: error.message,
              error: error,
              res: res,
            })
          );
      }
    } catch (error) {
      return responseHandler({
        data: null,
        status: 500,
        msg: "Something went wrong",
        error: error,
        res: res,
      });
    }
  };

  public getFolderTree = async (req: Request, res: Response) => {
    try {
      const { folderId } = req.params;

      if (req.user) {
        new GetFolderTree(this.folderRepository)
          .execute(req.user.id, folderId, [])
          .then((tree) => {
            return responseHandler({
              data: tree,
              status: 200,
              msg: "success",
              res: res,
            });
          })
          .catch((error) =>
            responseHandler({
              data: null,
              status: 401,
              msg: error.message,
              error: error,
              res: res,
            })
          );
      }
    } catch (error) {
      return responseHandler({
        data: null,
        status: 500,
        msg: "Something went wrong",
        error: error,
        res: res,
      });
    }
  };

  public deleteFolder = async (req: Request, res: Response) => {
    try {
      const { folderId } = req.params;

      if (req.user) {
        new DeleteFolder(this.folderRepository)
          .execute(req.user.id, folderId)
          .then((response) => {
            return responseHandler({
              data: response,
              status: 200,
              msg: "success",
              res: res,
            });
          })
          .catch((error) =>
            responseHandler({
              data: null,
              status: 401,
              msg: error.message,
              error: error,
              res: res,
            })
          );
      }
    } catch (error) {
      return responseHandler({
        data: null,
        status: 500,
        msg: "Something went wrong",
        error: error,
        res: res,
      });
    }
  };

  public getFolders = async (req: Request, res: Response) => {
    try {
      if (req.user) {
        new GetFolders(this.folderRepository)
          .execute(req.user.id)
          .then((folders) => {
            return responseHandler({
              data: folders,
              status: 200,
              msg: "success",
              res: res,
            });
          })
          .catch((error) =>
            responseHandler({
              data: null,
              status: 401,
              msg: error.message,
              error: error,
              res: res,
            })
          );
      }
    } catch (error) {
      return responseHandler({
        data: null,
        status: 500,
        msg: "Something went wrong",
        error: error,
        res: res,
      });
    }
  };
}
