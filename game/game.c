#include<stdio.h>
#include<string.h>
#include<unistd.h>
#include<sys/stat.h>

int map_row,map_col;
char bot1[20],bot2[20];
int score1,score2,f1,f2;
char g1[4]={'e','e','e','e'};
char g2[4]={'e','e','e','e'};
char map_state1[100][100];
char map_state2[100][100];

void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y);
void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y);
void new_pos(int dir, int old_row, int old_col, int *new_row, int *new_col);
void write_state_file();
void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y,int score1,int score2);
void read_state(char map[20]);

int main(int argc, char *argv[])
{
	
	char map[20],path1[30],path2[30];
	int dir;
	int i,j;
	int ghost_p1[4][2],pacman1_x,pacman1_y,ghost_p2[4][2],pacman2_x,pacman2_y;
	FILE *fp;
	if(argc!=4)
	{
		printf("\nUsage: <executable> <map> <bot1> <bot2>");	
		exit(1);
	}
	strcpy(map,argv[1]);

	read_state(map);

	strcpy(bot1,argv[2]);
	strcpy(bot2,argv[3]);
	printf("\n%s Vs %s\n",bot1,bot2);

	

	mkdir(bot1,0777);
	mkdir(bot2,0777);

	
	printf("before update");
	write_state_file();
	get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
	write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y,0,0);

	//compile_bot();
	//execute 10*w*h times
	printf("\nstate1 before change_state \n");
	
	change_state(ghost_p1,pacman1_x,pacman1_y,ghost_p2, pacman2_x,pacman2_y);//to chavoid write_state_file()nge the state according to move.txt in bot folders
	
	write_state_file();
	get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
	write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y,score1,score2);


}

void write_state_file()
{
	printf("inside update");
	int i,j;

	FILE *fp1, *fp2,*fp3;
	char map[20],path1[30],path2[30],ch1,ch2;

	strcpy(path1,bot1);
	strcat(path1,"/state.txt");
	strcpy(path2,bot2);
	strcat(path2,"/state.txt");
	printf("\nstate1\n");
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			printf("%c ", map_state1[i][j]);			
		}
		printf("\n");
	}
	
	fp2=fopen(path1,"w+");
	fp3=fopen(path2,"w+");

	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2=map_state2[i][j]; 
			
			fputc(ch1, fp2);
			fputc(' ',fp2);
			fputc(ch2, fp3);
			fputc(' ',fp3);
			if(ferror(fp2)) {
			printf("Error writing destination file.\n");	
			exit(1);
			}
			if(ferror(fp3)) {
			printf("Error writing destination file.\n");	
			exit(1);
			}		
		}
	fputc('\n',fp2);
	fputc('\n',fp3);
	}
	fclose(fp2);
	fclose(fp3);
	
	
}

void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y,int score1,int score2)
{
		

	printf("inside write");
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

void read_state(char map[20])
{
	int i,j;	
	FILE *fp;
	char ch;
	fp=fopen(map, "r");
	i=0;j=0;
	while(!feof(fp)) 
	{
		ch = fgetc(fp);
		if(ferror(fp)) {
			printf("Error reading source file.\n");
			exit(1);
		}
		map_state1[i][j]=ch;
		map_state2[i][j]=map_state1[i][j]; 
			if(map_state2[i][j]=='G')
				map_state2[i][j]='g';
			else if(map_state2[i][j]=='g')
				map_state2[i][j]='G';
			else if(map_state2[i][j]=='p')
				map_state2[i][j]='P';
			else if(map_state2[i][j]=='P')
				map_state2[i][j]='p';						
		if(ch!=' ')
		j++;
		if(ch=='\n'){map_col=j-1;j=0;i++;}
	}
	fclose(fp);
	map_row=i;
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++)
			printf("%c ",map_state1[i][j]);
		printf("\n");
	}
}




void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y)
{
	int g1=0,g2=0,i,j;
	char ch1,ch2;
	// to get positions of ghosts and pacman frm map_state
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2=map_state2[i][j]; 
			//for trace
			if(ch1=='G'){
				ghost_p1[g1][0]=i;
				ghost_p1[g1][1]=j;
				g1++;
			}
			else
			if(ch1=='P'){
				*pacman1_x=i;
				*pacman1_y=j;
			}
			if(ch2=='G'){
				ghost_p2[g2][0]=i;
				ghost_p2[g2][1]=j;
				g2++;
			}
			else
			if(ch2=='P'){
				*pacman2_x=i;
				*pacman2_y=j;
			}
		}
	}
   			

}

void new_pos(int dir, int old_row, int old_col, int *new_row, int *new_col)
{

	
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
}

void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y)
{
	char path1[30],path2[30];
	int new_ghost_p1[4][2],new_pacman1_x,new_pacman1_y,new_ghost_p2[4][2],new_pacman2_x,new_pacman2_y,i,j;
	FILE *fp;
	int dir;
	

	strcpy(path1,bot1);
	strcat(path1,"/move.txt");
	strcpy(path2,bot2);
	strcat(path2,"/move.txt");
	printf("%s",path1);
		//for bot1
	fp=fopen(path1,"r+");
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p1[0][0],ghost_p1[0][1], &new_ghost_p1[0][0],&new_ghost_p1[0][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p1[1][0],ghost_p1[1][1], &new_ghost_p1[1][0],&new_ghost_p1[1][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p1[2][0],ghost_p1[2][1], &new_ghost_p1[2][0],&new_ghost_p1[2][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p1[3][0],ghost_p1[3][1], &new_ghost_p1[3][0],&new_ghost_p1[3][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,pacman1_x,pacman1_y, &new_pacman1_x,&new_pacman1_y);		

	fclose(fp);
	//bot2
	fp=fopen(path2,"r+");
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p2[0][0],ghost_p2[0][1], &new_ghost_p2[0][0],&new_ghost_p2[0][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p2[1][0],ghost_p2[1][1], &new_ghost_p2[1][0],&new_ghost_p2[1][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p2[2][0],ghost_p2[2][1], &new_ghost_p2[2][0],&new_ghost_p2[2][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,ghost_p2[3][0],ghost_p2[3][1], &new_ghost_p2[3][0],&new_ghost_p2[3][1]);
	fscanf(fp,"%d ",&dir);
	new_pos(dir,pacman2_x,pacman2_y, &new_pacman2_x,&new_pacman2_y);		
	fclose(fp);
	


	//change score, map_state1,map_state2	
	map_state1[pacman1_x][pacman1_y]='.';
	map_state2[pacman1_x][pacman1_y]='.';	
	map_state1[pacman2_x][pacman2_y]='.';
	map_state2[pacman2_x][pacman2_y]='.';	
	
	printf("\nstate1 after old pacman changes in change_state\n");
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			printf("%c ", map_state1[i][j]);			
		}
		printf("\n");
	}	
	
	for(i=0;i<4;i++)
	{
		map_state1[ghost_p1[i][0]][ghost_p1[i][1]]='e';
		map_state2[ghost_p1[i][0]][ghost_p1[i][1]]='e';

		map_state2[ghost_p2[i][0]][ghost_p2[i][1]]='e';
		map_state1[ghost_p2[i][0]][ghost_p2[i][1]]='e';
	}

	printf("\nstate1 aftr changes to ghosts in change_state\n");
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			printf("%c ", map_state1[i][j]);			
		}
		printf("\n");
	}
	
	if(map_state1[new_pacman1_x][new_pacman1_y]=='e') score1++;
	else if(map_state1[new_pacman1_x][new_pacman1_y]=='E') {score1=+10; f1=1;}


	if(map_state2[new_pacman2_x][new_pacman2_y]=='e') score2++;
	else if(map_state2[new_pacman2_x][new_pacman2_y]=='E') {score2=+10; f2=1;}
	
	for(i=0;i<4;i++)
	{
		if(((new_pacman1_x==ghost_p1[i][0])&&(new_pacman1_y==ghost_p1[i][1]))||((new_pacman1_x==new_ghost_p1[i][0])&&(new_pacman1_y==new_ghost_p1[i][1])))
		{
			if(f1==0)
			{
				//ghost eats pacman
			}
			else if (f1==1)
			{
				//pacman eats ghost
			}
		}

		if(((new_pacman2_x==ghost_p2[i][0])&&(new_pacman2_y==ghost_p2[i][1]))||((new_pacman2_x==new_ghost_p2[i][0])&&(new_pacman2_y==new_ghost_p2[i][1])))
		{
			if(f2==0)
			{
				//ghost eats pacman
			}
			else if (f2==1)
			{
				//pacman eats ghost
			}
		}
	}
	

	
	//if pacmans don't coincide
	map_state1[new_pacman1_x][new_pacman1_y]='P';
	map_state2[new_pacman1_x][new_pacman1_y]='p';	
	map_state2[new_pacman2_x][new_pacman2_y]='P';
	map_state1[new_pacman2_x][new_pacman2_y]='p';	
		
	
	//if ghosts do not coincide// keep track of old values at positions where ghost is present
	for(i=0;i<4;i++)
	{
		g1[i]=map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]];
		g2[i]=map_state2[new_ghost_p1[i][0]][new_ghost_p1[i][1]];
		map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]]='G';
		map_state2[new_ghost_p1[i][0]][new_ghost_p1[i][1]]='g';

		map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]]='G';
		map_state1[new_ghost_p2[i][0]][new_ghost_p2[i][1]]='g';
	}
	
	
	
}

