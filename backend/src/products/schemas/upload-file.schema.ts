import { FileValidator, FileTypeValidator, MaxFileSizeValidator, ParseFileOptions, ParseFilePipe } from "@nestjs/common";
import { IFile } from "@nestjs/common/pipes/file/interfaces";


class ImageSizeValidator extends FileValidator {
    
    isValid( file? : IFile ) : boolean {

        if( !file ) return false ;
        
        return ( file as Express.Multer.File ).size <= (5*1024*1024) 
    
    }

    buildErrorMessage() {
        return `The file suppers the max size of 5MB`
    }
}


class ImageTypeValidator extends FileValidator {

    isValid ( file? : IFile ) : boolean {

        if( !file ) return false ;

        return /image\/(jpeg|png|jpg)/.test((file as Express.Multer.File).mimetype ?? '');
        
    }

    buildErrorMessage() {
        return `Invalid format. Only jpeg, png or jpg`
    }

}

export const uploadImageFileOptions = new ParseFilePipe( {

    fileIsRequired: false ,

    validators: [
        new ImageSizeValidator( {} ),
        new ImageTypeValidator({})
        
    ],
   
} )


export const uploadImageFileOptionsRequired = new ParseFilePipe({
    fileIsRequired: true,
    validators: [
        new ImageSizeValidator({}),
        new ImageTypeValidator({})
    ]
})
