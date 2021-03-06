import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AssignStudentsToLessonInput } from 'src/student/assign-students-to-lesson.input';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

//equivalent to controller
@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => LessonType)
  lessonExample() {
    return {
      id: '57845t4r5t45',
      name: 'TypeScript Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    return this.studentService.getManyStudents(lesson.students);
  }

  //   @Mutation((returns) => LessonType)
  //   createLessonExample(
  //     @Args('name') name: string,
  //     @Args('startDate') startDate: string,
  //     @Args('endDate') endDate: string,
  //   ) {
  //     return this.lessonService.createLesson(name, startDate, endDate);
  //   }
}
