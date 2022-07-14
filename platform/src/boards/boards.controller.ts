import { UpdateBoardDto } from './dto/update-board.dto';
/* eslint-disable prettier/prettier */
import { editFileName, imageFileFilter } from './../utils/file-uploading.utils';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { Bind, Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { render } from 'nunjucks';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}
    
    
    //게시판 홈 페이지, 게시글 목록
    @Get('/')
    //@Render('boardhome.njk')
    async getAllBoard(@Res() res:Response){
        const boards = await this.boardService.getBoardAll();
        res.render('boardhome',  {boards:boards});
    }
                                                            //게시판 검색
                                                           
    //게시판 상세페이지
    @Get('detail/:id')
    async getBoardById(@Param ('id') id:number, @Res() res:Response){
        const board = await this.boardService.getBoardById(id);
        res.render('boardDetail', {board: board});
    }
                                                            

    //게시판 글 작성 페이지 렌더링
    @Get('/write')
    //@Render('boardwrite.njk')
    writeBoard(@Res() res:Response){
        res.render('boardwrite');
    }
    
    //게시판 글 작성 POST
    @Post('/writePro')
    @UsePipes(ValidationPipe) 
    @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ) //한개의 사진 post
  createBoard(@Body() createBoardDto: CreateBoardDto, @UploadedFile() file): Promise<Board>{
    const response = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
      console.log(response.path);
    createBoardDto.image= 'http://localhost:8000/'+ response.filename;
    return this.boardService.createBoard(createBoardDto);
    }
 
    //게시글 수정
    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() board: UpdateBoardDto) {
      return this.boardService.UpdateBoard(id, board);
    }

    //게시글 삭제
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
      return this.boardService.DeleteBoard(id);
    }
 
 
}