#define TIME_LIMIT_EXCEEDED -6
#define SEGMENTATION_FAULT -3
#define ARITHMETIC_EXCEPTION -4
#define RUNTIME_ERROR -5
#define COMPILE_ERROR -2
#define OUTPUT_ERROR -7

#include<stdio.h>
#include<string.h>
#include<unistd.h>
#include<sys/stat.h>
#include<stdlib.h>

int map_row,map_col;
char bot1[20],bot2[20];
int score1,score2,f1,f2;
char g1[4]={'e','e','e','e'};
char g2[4]={'e','e','e','e'};
char map_state1[100][100];
char map_state2[100][100];	//For different perspectives of each player
int init_ghost_p1[4][2],init_ghost_p2[4][2];


void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y);
void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y);
int new_pos(int dir, int old_row, int old_col, int *new_row, int *new_col,int bot);
int write_state_file();
void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y);
int read_state(char map[20]);
int compile_bot();
void delete_bots();
void end_game(int winner,int flag,int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y);

int main(int argc, char *argv[])
{
	
	char map[20],path1[30],path2[30];
	int dir,ret;
	int i,j;
	int ghost_p1[4][2],pacman1_x,pacman1_y,ghost_p2[4][2],pacman2_x,pacman2_y;
	char exec1[100],exec2[100];
	FILE *fp;
	char dir1[20], dir2[20];
	int compile_status,exec_status1=0,exec_status2=0;

	atexit(delete_bots);

	if(argc!=4)
	{
		printf("\nUsage: <executable> <map> <bot1> <bot2> ");	
		exit(1);
	}

	
	strcpy(map,argv[1]);	
	strcpy(bot1,argv[2]);
	strcpy(bot2,argv[3]);

	system("rm trace.txt");

	printf("\n%s Vs %s\n",bot1,bot2);
	
	sprintf(dir1,"./extract %s",bot1);
	sprintf(dir2,"./extract %s",bot2);
	system(dir1);
	system(dir2);

	ret=read_state(map);
	if(ret==1) exit(1);
	
		
	
	write_state_file();
	get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
	
	write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);

	compile_status=compile_bot();			
	if(compile_status==1)
	{

		end_game(2,COMPILE_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
	}
	else if(compile_status==2)
	{

		end_game(1,COMPILE_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
	}
	

	sprintf(exec1,"timeout 5s ./%s/%s < ./%s/state.txt > ./%s/move.txt",bot1,bot1,bot1,bot1);
	sprintf(exec2,"timeout 5s ./%s/%s < ./%s/state.txt > ./%s/move.txt",bot2,bot2,bot2,bot2);

	/*store initial ghost positions*/
	for(i=0;i<4;i++)
	{
		init_ghost_p1[i][0]=ghost_p1[i][0];
		init_ghost_p2[i][0]=ghost_p2[i][0];
	}
	
	//execute 1000 times
	for(i=0;i<1000;i++)
	{
		exec_status1=system(exec1);
		exec_status1=WEXITSTATUS(exec_status1);
		if(exec_status1!=0)
		{
			switch(exec_status1)
			{
				case 124 : exec_status1=TIME_LIMIT_EXCEEDED;
				break;	
				case 139 : exec_status1=SEGMENTATION_FAULT;
				break;
				case 136 : exec_status1=ARITHMETIC_EXCEPTION;
				break;
				default : exec_status1=RUNTIME_ERROR;
				
			}
		}

		exec_status2=system(exec2);
		exec_status2=WEXITSTATUS(exec_status2);
		if(exec_status2!=0)
		{
			switch(exec_status2)
			{
				case 124 : exec_status2=TIME_LIMIT_EXCEEDED;
				break;	
				case 139 : exec_status2=SEGMENTATION_FAULT;
				break;
				case 136 : exec_status2=ARITHMETIC_EXCEPTION;
				break;
				default : exec_status2=RUNTIME_ERROR;
				
				
			}
		}
		if(exec_status1!=0||exec_status2!=0)
		{
			if((exec_status1==TIME_LIMIT_EXCEEDED||exec_status1==SEGMENTATION_FAULT||exec_status1==ARITHMETIC_EXCEPTION||exec_status1==RUNTIME_ERROR)&&
			(exec_status2==TIME_LIMIT_EXCEEDED||exec_status2==SEGMENTATION_FAULT||exec_status2==ARITHMETIC_EXCEPTION||exec_status2==RUNTIME_ERROR))
			{
				f1=exec_status1;
				f2=exec_status2;
				write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
				printf("Both bots lose!\n");
				exit(1);
			}
			else
			if(exec_status1==TIME_LIMIT_EXCEEDED||exec_status1==SEGMENTATION_FAULT||exec_status1==ARITHMETIC_EXCEPTION||exec_status1==RUNTIME_ERROR)
			{
				end_game(2,exec_status1,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
			}
			else if(exec_status2==TIME_LIMIT_EXCEEDED||exec_status2==SEGMENTATION_FAULT||exec_status2==ARITHMETIC_EXCEPTION||exec_status2==RUNTIME_ERROR)
			{
				end_game(1,exec_status2,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
			}		
		}
		change_state(ghost_p1,pacman1_x,pacman1_y,ghost_p2, pacman2_x,pacman2_y);//to change the state according to move.txt in bot folders
		ret=write_state_file();
		if(ret==1) exit(1);
		get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
		write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
		f1=0;f2=0;
	}
	
	
}


int compile_bot()
{
	char path1[30],path2[30];
	char *homepath;
	int x,y;
	int retstatus;
	homepath=getcwd(NULL,0);

	//for bot1
	strcpy(path1,"");
	strcat(path1,bot1);	
	x=chdir(path1);
	if(x!=0) printf("Error opening the path of player 1");
	retstatus=system("make");
	if(retstatus!=0)return 1;
	chdir(homepath);

	//for bot2
	strcpy(path2,"");
	strcat(path2,bot2);
	y=chdir(path2);
	if(y!=0) printf("Error opening the path of player 2");
	retstatus=system("make");
	if(retstatus!=0)return 2;
	

	chdir(homepath);
	return 0;
}

void delete_bots()
{
	char dir1[20],dir2[20];
	sprintf(dir1,"rm -R %s",bot1);
	sprintf(dir2,"rm -R %s",bot2);
	system(dir1);
	system(dir2);
}

/*write states of each bot in state.txt inside corresponding folder*/
int write_state_file()
{
	int i,j;
	
	FILE *fp1,*fp2;
	char map[20],path1[30],path2[30],ch1,ch2;

	strcpy(path1,bot1);
	strcat(path1,"/state.txt");
	strcpy(path2,bot2);
	strcat(path2,"/state.txt");

	fp2=fopen(path2,"w");
	if(fp2==NULL){
		printf("NULL pointer fp2\n");
	}

	fp1=fopen(path1,"w+");
	if(fp1==NULL){
		printf("NULL pointer fp1\n");
	}

	if(fp1!=NULL&&fp2!=NULL)
	{

	fprintf(fp1,"%d %d\n",map_row,map_col);
	fprintf(fp2,"%d %d\n",map_row,map_col);
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2 = map_state2[i][j]; 

			fprintf(fp1,"%c",ch1);
			fprintf(fp1," ");

			fprintf(fp2,"%c",ch2);
			fprintf(fp2," ");

			if(ferror(fp1)) {
			printf("Error writing destination file.\n");	
			return 1;
			}
			if(ferror(fp2)) {
			printf("Error writing destination file.\n");	
			return 1;
			}		
		}
		fputc('\n',fp1);
		fputc('\n',fp2);
	}
	
	fclose(fp1);
	fclose(fp2);
	}
	return 0;
}


/*write positions, score and flag into trace.txt*/
void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y)
{
		

	FILE *fp;
	int i;
	fp=fopen("trace.txt","a");
	
	for(i=0;i<4;i++)
	{
		fprintf(fp,"%d %d ",ghost_p1[i][0],ghost_p1[i][1]);
	}
	fprintf(fp,"%d %d ", pacman1_x,pacman1_y);
	for(i=0;i<4;i++)
	{
		fprintf(fp,"%d %d ",ghost_p2[i][0],ghost_p2[i][1]);
	}
	fprintf(fp,"%d %d ", pacman2_x,pacman2_y);
	fprintf(fp,"%d %d ", score1,score2);
	fprintf(fp,"%d %d\n", f1,f2);

}




/*to read the initial state from map

mapstate1 and mapstate2 are arrays for state of bot1 and bot2

map_col,map_row- number of columns and rows in the map
*/
int read_state(char map[20])
{
	int i,j;	
	FILE *fp;
	char ch;
	char cmd[40];
	
	sprintf(cmd,"cp ./maps/%s ./maps/map",map);
	system(cmd);
	fp=fopen("./maps/map", "r");
	
	i=0;j=0;
	while(!feof(fp)) 
	{
		ch = fgetc(fp);
		if(ferror(fp)) {
			printf("Error reading source file.\n");
			return 1;
		}
		map_state1[i][j]=ch;
		map_state2[i][j]=map_state1[i][j]; 
			if(map_state2[i][j]=='A')			
				map_state2[i][j]='a';
			else if (map_state2[i][j]=='B')			
				map_state2[i][j]='b';
			else if (map_state2[i][j]=='C')			
				map_state2[i][j]='c';
			else if (map_state2[i][j]=='D')			
				map_state2[i][j]='d';
			else if(map_state2[i][j]=='a')
				map_state2[i][j]='A';
			else if(map_state2[i][j]=='b')
				map_state2[i][j]='B';
			else if(map_state2[i][j]=='c')
				map_state2[i][j]='C';
			else if(map_state2[i][j]=='d')
				map_state2[i][j]='D';
			else if(map_state2[i][j]=='p')
				map_state2[i][j]='P';
			else if(map_state2[i][j]=='P')
				map_state2[i][j]='p';						
		if(ch!=' ')
		j++;
		if(ch=='\n'){
			map_col=j-1;j=0;i++;
		}
	}
	fclose(fp);
	map_row=i;
	return 0;
}


/*get current positions of all ghosts and pacman*/

void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y)
{
	int no_of_g1=0,no_of_g2=0,i,j;
	char ch1,ch2;
	int index;
		
	// to get positions of ghosts and pacman from map_state
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2 = map_state2[i][j]; 
			//for trace
			if(ch1=='A'||ch1=='B'||ch1=='C'||ch1=='D'){				
				ghost_p1[ch1-65][0]=i;
				ghost_p1[ch1-65][1]=j;
				no_of_g1++;
			}
	
			else
			if(ch1=='P'||ch1=='Q'){
				*pacman1_x=i;
				*pacman1_y=j;
			}
			
			//player2
			if(ch2=='A'||ch2=='B'||ch2=='C'||ch2=='D'){				
				ghost_p2[ch2-65][0]=i;
				ghost_p2[ch2-65][1]=j;
				no_of_g2++;
			}
			else
			if(ch2=='P'||ch2=='Q'){
				*pacman2_x=i;
				*pacman2_y=j;
			}
		}
	}
   			

}


/*1 - up
  2 - down
  3 - left
  4 - right*/
int new_pos(int dir, int old_row, int old_col, int *new_row, int *new_col,int bot)
{

    if(dir!=1&&dir!=2&&dir!=3&&dir!=4)
    {
        return 0;
    }
	
	if (dir==1&&map_state1[old_row-1][old_col]!='W')// compared with map_state1 to check for wall
	{
		*new_row=old_row-1;
		*new_col=old_col;
	}
	else if (dir==2&&map_state1[old_row+1][old_col]!='W')
	{
		*new_row=old_row+1;
		*new_col=old_col;
	}
	else if (dir==3&&map_state1[old_row][old_col-1]!='W')
	{
		*new_row=old_row;
		*new_col=old_col-1;
	}
	else if(dir==4&&map_state1[old_row][old_col+1]!='W')
	{
		*new_row=old_row;
		*new_col=old_col+1;
	}
	else					
	{
		*new_row=old_row;
		*new_col=old_col;
	}
	return 1;
}


/*to read moves from move.txt in corresponding bot folders and change the states of bots*/

void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y)
{
	char path1[30],path2[30];
	int new_ghost_p1[4][2],new_pacman1_x,new_pacman1_y,new_ghost_p2[4][2],new_pacman2_x,new_pacman2_y,i,j;
	FILE *fp;
	int dir;
	int flag1=0,flag2=0;
	int count,ret;
	int move_flag1=1,move_flag2=1,move_flag3=1;
	
	strcpy(path1,"");
	strcpy(path1,bot1);
	strcat(path1,"/move.txt");
	strcpy(path2,"");
	strcpy(path2,bot2);
	strcat(path2,"/move.txt");


	//for bot1
	fp=fopen(path1,"r"); 
	
	for(i=0;i<4;i++)
	{
	    count=fscanf(fp,"%d",&dir);
	    if(count==1)
        	ret=new_pos(dir,ghost_p1[i][0],ghost_p1[i][1], &new_ghost_p1[i][0],&new_ghost_p1[i][1],1);
        if(count!=1||ret!=1)
        {
		
		end_game(2,OUTPUT_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
        }
	}
	count=fscanf(fp,"%d ",&dir);
	if (count==1)
    	ret=new_pos(dir,pacman1_x,pacman1_y, &new_pacman1_x,&new_pacman1_y,1);		
    if(count!=1||ret!=1)
        {

		end_game(2,OUTPUT_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
        }	

	fclose(fp);

	//bot2
	fp=fopen(path2,"r");
	for(i=0;i<4;i++)
	{
	    count=fscanf(fp,"%d",&dir);
	    if(count==1)
        	ret=new_pos(dir,ghost_p2[i][0],ghost_p2[i][1], &new_ghost_p2[i][0],&new_ghost_p2[i][1],2);
        if(count!=1||ret!=1)
        {

		end_game(1,OUTPUT_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
        }
	}
	count=fscanf(fp,"%d ",&dir);
	if (count==1)
    	ret=new_pos(dir,pacman2_x,pacman2_y, &new_pacman2_x,&new_pacman2_y,2);		
        if(count!=1||ret!=1)
        {

		end_game(1,OUTPUT_ERROR,ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
        }
	fclose(fp);
	

	//The previous positions are written with a '.'
	map_state1[pacman1_x][pacman1_y]='.';
	map_state2[pacman1_x][pacman1_y]='.';	
	map_state1[pacman2_x][pacman2_y]='.';
	map_state2[pacman2_x][pacman2_y]='.';	
	
	
	//previous positions of ghosts are stored in g1 and g2 array
	for(i=0;i<4;i++)
	{
		map_state1[ghost_p1[i][0]][ghost_p1[i][1]]=g1[i];
		map_state2[ghost_p1[i][0]][ghost_p1[i][1]]=g1[i];

		map_state2[ghost_p2[i][0]][ghost_p2[i][1]]=g2[i];
		map_state1[ghost_p2[i][0]][ghost_p2[i][1]]=g2[i];
	}

	while(move_flag1==1)
	{
	for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				if(i!=j)
				{
					if((new_ghost_p1[i][0]==new_ghost_p1[j][0]&&new_ghost_p1[i][1]==new_ghost_p1[j][1])||
						((new_ghost_p1[i][0]==ghost_p1[j][0]&&new_ghost_p1[i][1]==ghost_p1[j][1])&&
						(new_ghost_p1[j][0]==ghost_p1[i][0]&&new_ghost_p1[j][1]==ghost_p1[i][1]))) 
					{	
							new_ghost_p1[i][0]=ghost_p1[i][0];
							new_ghost_p1[i][1]=ghost_p1[i][1];
							new_ghost_p1[j][0]=ghost_p1[j][0];
							new_ghost_p1[j][1]=ghost_p1[j][1];
							move_flag1=1; j=5;i=5; break;							
					}
					else move_flag1=0;
				}
			}
		}
	}

	while(move_flag2==1)
	{
	for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				if(i!=j)
				{
					if((new_ghost_p2[i][0]==new_ghost_p2[j][0]&&new_ghost_p2[i][1]==new_ghost_p2[j][1])||
						((new_ghost_p2[i][0]==ghost_p2[j][0]&&new_ghost_p2[i][1]==ghost_p2[j][1])&&
						(new_ghost_p2[j][0]==ghost_p2[i][0]&&new_ghost_p2[j][1]==ghost_p2[i][1])))
					{	
							new_ghost_p2[i][0]=ghost_p2[i][0];
							new_ghost_p2[i][1]=ghost_p2[i][1];
							new_ghost_p2[j][0]=ghost_p2[j][0];
							new_ghost_p2[j][1]=ghost_p2[j][1];	
							move_flag2=1;i=5;j=5;break;
					}
					else move_flag2=0;				
				}
			}
		}

	}

	//ghosts of different player
	while(move_flag3==1)
	{
	for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
					if((new_ghost_p1[i][0]==new_ghost_p2[j][0]&&new_ghost_p1[i][1]==new_ghost_p2[j][1])||
						((new_ghost_p1[i][0]==ghost_p2[j][0]&&new_ghost_p1[i][1]==ghost_p2[j][1])&&
						(new_ghost_p2[j][0]==ghost_p1[i][0]&&new_ghost_p2[j][1]==ghost_p1[i][1]))) 
					{	
							new_ghost_p1[i][0]=ghost_p1[i][0];
							new_ghost_p1[i][1]=ghost_p1[i][1];
							new_ghost_p2[j][0]=ghost_p2[j][0];
							new_ghost_p2[j][1]=ghost_p2[j][1];								
							move_flag3=1;i=5;j=5;break;	
					}	
					else move_flag3=0;		
			}
		}	
	}	

	

	/*If the new position of pacman coincides with the new/current position of G and if f is set, then pacman eats ghost.
	If the new position of pacman coincides with the new/current position of G and if f is not set, then game ends.*/



	if(f1==0)
	{

		for(j=0;j<4;j++)
		{
			if ((new_pacman2_x==ghost_p2[j][0]&&new_pacman2_y==ghost_p2[j][1]&&pacman2_x==new_ghost_p2[j][0]&&pacman2_y==new_ghost_p2[j][1])||
			(new_pacman2_x==new_ghost_p2[j][0]&&new_pacman2_y==new_ghost_p2[j][1])||
			(new_pacman2_x==ghost_p1[j][0]&&new_pacman2_y==ghost_p1[j][1]&&pacman2_x==new_ghost_p1[j][0]&&pacman2_y==new_ghost_p1[j][1])||
			(new_pacman2_x==new_ghost_p1[j][0]&&new_pacman2_y==new_ghost_p1[j][1]))
			{
				flag1=1;
			}
		}
		for(i=0;i<4;i++)
		{
		if(
			(
			(new_pacman1_x==ghost_p2[i][0]&&new_pacman1_y==ghost_p2[i][1]&&pacman1_x==new_ghost_p2[i][0]&&pacman1_y==new_ghost_p2[i][1])||
			(new_pacman1_x==new_ghost_p2[i][0]&&new_pacman1_y==new_ghost_p2[i][1])||
			(new_pacman1_x==ghost_p1[i][0]&&new_pacman1_y==ghost_p1[i][1]&&pacman1_x==new_ghost_p1[i][0]&&pacman1_y==new_ghost_p1[i][1])||
			(new_pacman1_x==new_ghost_p1[i][0])&&(new_pacman1_y==new_ghost_p1[i][1])
			)
			&&(flag1!=1)
		)
		
			{

				end_game(2,-1,new_ghost_p1,new_pacman1_x,new_pacman1_y,new_ghost_p2,new_pacman2_x,new_pacman2_y);
			}
		
		}
	}
		
	
	else if(f1==1)
	{
	for(i=0;i<4;i++)
	{
		if((((new_pacman1_x==ghost_p2[i][0])&&(new_pacman1_y==ghost_p2[i][1]))&&((pacman1_x==new_ghost_p2[i][0])&&(pacman1_y==new_ghost_p2[i][1])))||
					((new_pacman1_x==new_ghost_p2[i][0])&&(new_pacman1_y==new_ghost_p2[i][1])))
		{
				if(map_state1[init_ghost_p2[1][0]][init_ghost_p2[1][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[1][0];new_ghost_p2[i][1]=init_ghost_p2[1][1];}
				else if(map_state1[init_ghost_p2[2][0]][init_ghost_p2[2][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[2][0];new_ghost_p2[i][1]=init_ghost_p2[2][1];}				
				else if(map_state1[init_ghost_p2[0][0]][init_ghost_p2[0][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[0][0];new_ghost_p2[i][1]=init_ghost_p2[0][1];}				
				else if(map_state1[init_ghost_p2[3][0]][init_ghost_p2[3][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[3][0];new_ghost_p2[i][1]=init_ghost_p2[3][1];}
				f1=0;
			
		}
		if((((new_pacman1_x==ghost_p1[i][0])&&(new_pacman1_y==ghost_p1[i][1]))&&((pacman1_x==new_ghost_p1[i][0])&&(pacman1_y==new_ghost_p1[i][1])))||
					((new_pacman1_x==new_ghost_p1[i][0])&&(new_pacman1_y==new_ghost_p1[i][1])))
		{
				if(map_state1[init_ghost_p1[1][0]][init_ghost_p1[1][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[1][0];new_ghost_p1[i][1]=init_ghost_p1[1][1];}
				else if(map_state1[init_ghost_p1[2][0]][init_ghost_p1[2][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[2][0];new_ghost_p1[i][1]=init_ghost_p1[2][1];}				
				else if(map_state1[init_ghost_p1[0][0]][init_ghost_p1[0][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[0][0];new_ghost_p1[i][1]=init_ghost_p1[0][1];}				
				else if(map_state1[init_ghost_p1[3][0]][init_ghost_p1[3][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[3][0];new_ghost_p1[i][1]=init_ghost_p1[3][1];}
				f1=0;

		}
	}

	}


	if(f2==0)
	{

		for(j=0;j<4;j++)
		{
			if
			(
			(new_pacman1_x==ghost_p2[j][0]&&new_pacman1_y==ghost_p2[j][1]&&pacman1_x==new_ghost_p2[j][0]&&pacman1_y==new_ghost_p2[j][1])||
			(new_pacman1_x==new_ghost_p2[j][0]&&new_pacman1_y==new_ghost_p2[j][1])||
			(new_pacman1_x==ghost_p1[j][0]&&new_pacman1_y==ghost_p1[j][1]&&pacman1_x==new_ghost_p1[j][0]&&pacman1_y==new_ghost_p1[j][1])||
			(new_pacman1_x==new_ghost_p1[j][0])&&(new_pacman1_y==new_ghost_p1[j][1])
			)
			{
				flag2=1;
			}
			
		
		}
		for(i=0;i<4;i++)
		{
		if(
			(
			(new_pacman2_x==ghost_p2[i][0]&&new_pacman2_y==ghost_p2[i][1]&&pacman2_x==new_ghost_p2[i][0]&&pacman2_y==new_ghost_p2[i][1])||
			(new_pacman2_x==new_ghost_p2[i][0]&&new_pacman2_y==new_ghost_p2[i][1])||
			(new_pacman2_x==ghost_p1[i][0]&&new_pacman2_y==ghost_p1[i][1]&&pacman2_x==new_ghost_p1[i][0]&&pacman2_y==new_ghost_p1[i][1])||
			(new_pacman2_x==new_ghost_p1[i][0]&&new_pacman2_y==new_ghost_p1[i][1])
			)
			&&(flag2!=1)
		)
			{	
				end_game(1,-1,new_ghost_p1,new_pacman1_x,new_pacman1_y,new_ghost_p2,new_pacman2_x,new_pacman2_y);
			}
		
		}
	}
	else if(f2==1)
	{
	for(i=0;i<4;i++)
	{
		if((((new_pacman2_x==ghost_p2[i][0])&&(new_pacman2_y==ghost_p2[i][1]))&&((pacman2_x==new_ghost_p2[i][0])&&(pacman1_y==new_ghost_p2[i][1])))||
					((new_pacman2_x==new_ghost_p2[i][0])&&(new_pacman2_y==new_ghost_p2[i][1])))
		{
				if(map_state1[init_ghost_p2[1][0]][init_ghost_p2[1][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[1][0];new_ghost_p2[i][1]=init_ghost_p2[1][1];}
				else if(map_state1[init_ghost_p2[2][0]][init_ghost_p2[2][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[2][0];new_ghost_p2[i][1]=init_ghost_p2[2][1];}				
				else if(map_state1[init_ghost_p2[0][0]][init_ghost_p2[0][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[1][0];new_ghost_p2[i][1]=init_ghost_p2[0][1];}				
				else if(map_state1[init_ghost_p2[3][0]][init_ghost_p2[3][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[3][0];new_ghost_p2[i][1]=init_ghost_p2[3][1];}
				f2=0;
			
		}
		if((((new_pacman2_x==ghost_p1[i][0])&&(new_pacman2_y==ghost_p1[i][1]))&&((pacman2_x==new_ghost_p1[i][0])&&(pacman2_y==new_ghost_p1[i][1])))||
					((new_pacman2_x==new_ghost_p1[i][0])&&(new_pacman2_y==new_ghost_p1[i][1])))
		{
				if(map_state1[init_ghost_p1[1][0]][init_ghost_p1[1][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[1][0];new_ghost_p1[i][1]=init_ghost_p1[1][1];}
				else if(map_state1[init_ghost_p1[2][0]][init_ghost_p1[2][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[2][0];new_ghost_p1[i][1]=init_ghost_p1[2][1];}				
				else if(map_state1[init_ghost_p1[0][0]][init_ghost_p1[0][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[0][0];new_ghost_p1[i][1]=init_ghost_p1[0][1];}				
				else if(map_state1[init_ghost_p1[3][0]][init_ghost_p1[3][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[3][0];new_ghost_p1[i][1]=init_ghost_p1[3][1];}
				f2=0;

		}
	}

	}


	if(flag1==1&&flag2==1)
	{
		f1=-1;f2=-1;
		write_trace(new_ghost_p1,new_pacman1_x,new_pacman1_y,new_ghost_p2,new_pacman2_x,new_pacman2_y);
		printf("Both pacmans are dead!\n");
		if(score1>score2)
			printf(" Bot1 wins." );
		else if(score2>score1)
			printf(" Bot2 wins.");
		else printf("Tie!");
		exit(1);
	}

	//to increment score
	if(map_state1[new_pacman1_x][new_pacman1_y]=='e') score1++;
	else if(map_state1[new_pacman1_x][new_pacman1_y]=='E') {score1=+10; f1=1;}


	if(map_state2[new_pacman2_x][new_pacman2_y]=='e') score2++;
	else if(map_state2[new_pacman2_x][new_pacman2_y]=='E') {score2=+10; f2=1;}
	
	//if pacmans don't coincide
	//pacmans can go on one another
		//new positions of pacman
	if( new_pacman1_x==new_pacman2_x && new_pacman1_y==new_pacman2_y)
	{
		map_state1[new_pacman1_x][new_pacman1_y]='Q';
		map_state2[new_pacman1_x][new_pacman1_y]='Q';
	}
	else
	{

	map_state1[new_pacman1_x][new_pacman1_y]='P';
	map_state2[new_pacman1_x][new_pacman1_y]='p';	
	map_state2[new_pacman2_x][new_pacman2_y]='P';
	map_state1[new_pacman2_x][new_pacman2_y]='p';	
	}	

	//new positions of ghosts
	//check if ghosts do not coincide and to keep track of old values at positions where ghost was present


		for(i=0;i<4;i++)
		{
			if(map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]]!=i+'A')			
			g1[i]=map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]];
			if(map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]]!=i+'A')			
			g2[i]=map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]];		
		}


		
		map_state1[new_ghost_p1[0][0]][new_ghost_p1[0][1]]='A';
		map_state2[new_ghost_p1[0][0]][new_ghost_p1[0][1]]='a';
		map_state1[new_ghost_p1[1][0]][new_ghost_p1[1][1]]='B';
		map_state2[new_ghost_p1[1][0]][new_ghost_p1[1][1]]='b';
		map_state1[new_ghost_p1[2][0]][new_ghost_p1[2][1]]='C';
		map_state2[new_ghost_p1[2][0]][new_ghost_p1[2][1]]='c';
		map_state1[new_ghost_p1[3][0]][new_ghost_p1[3][1]]='D';
		map_state2[new_ghost_p1[3][0]][new_ghost_p1[3][1]]='d';

		map_state2[new_ghost_p2[0][0]][new_ghost_p2[0][1]]='A';
		map_state1[new_ghost_p2[0][0]][new_ghost_p2[0][1]]='a';
		map_state2[new_ghost_p2[1][0]][new_ghost_p2[1][1]]='B';
		map_state1[new_ghost_p2[1][0]][new_ghost_p2[1][1]]='b';
		map_state2[new_ghost_p2[2][0]][new_ghost_p2[2][1]]='C';
		map_state1[new_ghost_p2[2][0]][new_ghost_p2[2][1]]='c';
		map_state2[new_ghost_p2[3][0]][new_ghost_p2[3][1]]='D';
		map_state1[new_ghost_p2[3][0]][new_ghost_p2[3][1]]='d';
			
}


void end_game(int winner,int flag,int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y)
{
	if(winner!=1&&winner!=2) return;
	if(winner==1)
	{
		f2=flag;
		score1=score1+50;
	}
	else if(winner==2)
	{
		f1=flag;
		score2=score2+50;
	}
	write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y);
	printf("\nExitting... Bot %d wins...\n",winner);
	if(flag!=-1)
	{
				
		printf("\nBot %d failed: ",(winner==1)?2:1);
		switch(flag)
		{
			case -6:printf("TIME_LIMIT_EXCEEDED");
				break;
			case -3:printf("SEGMENTATION_FAULT");
				break;
			case -4:printf("ARITHMETIC_EXCEPTION");
				break;
			case -5:printf("RUNTIME_ERROR");
				break;
			case -2:printf("COMPILE_ERROR");
				break;
			case -7:printf("OUTPUT_ERROR");
				break;
		}
	}
	exit(1);
	
}
