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
char map_state2[100][100];	//For different perspectives of each player
int init_ghost_p1[4][2],init_ghost_p2[4][2];
int ghost_p1_alive[4],ghost_p2_alive[4];



void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y);
void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y);
void new_pos(int dir, int old_row, int old_col, int *new_row, int *new_col);
int write_state_file();
void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y,int score1,int score2);
void read_state(char map[20]);
void compile_bot();


int exec_count=0;
int main(int argc, char *argv[])
{
	
	char map[20],path1[30],path2[30];
	int dir;
	int i,j;
	int ghost_p1[4][2],pacman1_x,pacman1_y,ghost_p2[4][2],pacman2_x,pacman2_y;
	FILE *fp;
	if(argc!=5)
	{
		printf("\nUsage: <executable> <map> <bot1> <bot2> <nooftimes>");	
		exit(1);
	}

	int nooftimes=atoi(argv[4]);
	
	strcpy(map,argv[1]);
	
	strcpy(bot1,argv[2]);
	strcpy(bot2,argv[3]);

	printf("\n%s Vs %s\n",bot1,bot2);
	
	
	read_state(map);
	

	//map_state1
/*	printf("\nmapstate1\n");
	for (i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++)
		{
			printf("%c ",map_state1[i][j]);
		}
		printf("\n");
	}*/
	/*create directories for each bot*/
	mkdir(bot1,0777); //TODO:Change file permission to bare min needed
	mkdir(bot2,0777);


	

	
	write_state_file();
	get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
	
	/*store initial ghost positions*/
	


	write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y,0,0);

	compile_bot();			//compile bots
	for(i=0;i<4;i++)
	{
		init_ghost_p1[i][0]=ghost_p1[i][0];
		init_ghost_p2[i][0]=ghost_p2[i][0];
	}
	
	//execute 10*w*h times
	for(i=0;i<nooftimes;i++)
	{
		//printf("%d   ",i);
		printf("In aa");
		system("./aa_bot");
		printf("To bb");
		system("./bb_bot");
		printf("Back");
		//execl("./aa_bot","./aa_bot" (char *) 0);		
		//execl("./bb_bot", "./bb_bot"(char *) 0);		

		change_state(ghost_p1,pacman1_x,pacman1_y,ghost_p2, pacman2_x,pacman2_y);//to change the state according to move.txt in bot folders
		write_state_file();
		get_current_positions(ghost_p1, &pacman1_x,&pacman1_y,ghost_p2, &pacman2_x,&pacman2_y);
		write_trace(ghost_p1,pacman1_x,pacman1_y,ghost_p2,pacman2_x,pacman2_y,score1,score2);
	}
	
	
	
}

void compile_bot()
{
	char path1[30],path2[3];

	strcpy(path1,"");
	strcpy(path1,bot1);	
	strcat(path1,".c");	

	strcpy(path2,"");
	strcpy(path2,bot1);	
	strcat(path2,"_bot");


	strcpy(path1,"");
	strcpy(path1,bot2);	
	strcat(path1,".c");	

	strcpy(path2,"");
	strcpy(path2,bot2);	
	strcat(path2,"_bot");

	system("gcc aa.c -o aa_bot -lm");
	system("gcc bb.c -o bb_bot -lm");
}


/*write states of each bot in state.txt inside corresponding folder*/
int write_state_file()
{
	printf("\nIn write_state %d\n",exec_count);
	int i,j;
	
	FILE *fp1,*fp2,*fp3;
	char map[20],path1[30],path2[30],ch1,ch2;

	strcpy(path1,bot1);
	strcat(path1,"/state.txt");
	strcpy(path2,bot2);
	strcat(path2,"/state.txt");
	
	fp2=fopen(path1,"w");
	fp3=fopen(path2,"w");
printf("\nIn write_state %d\n",exec_count);
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2 = map_state2[i][j]; 
			printf("\nIn write_state %d %c %c\n",exec_count,ch1,ch2);
			fprintf(fp2,"%c",ch1);
			fprintf(fp2," ");
printf("\nIn write_state %d done\n",exec_count);
			fprintf(fp3,"%c",ch2);
			fprintf(fp3," ");
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


/*write positions, score and flag into trace.txt*/
void write_trace(int ghost_p1[4][2], int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y,int score1,int score2)
{
		

	FILE *fp;
	int i;
	fp=fopen("trace.txt","a");
	for(i=0;i<4;i++)
	{
		fprintf(stderr,"%d %d ",ghost_p1[i][0],ghost_p1[i][1]);
	}
	fprintf(stderr,"%d %d ", pacman1_x,pacman1_y);
	for(i=0;i<4;i++)
	{
		fprintf(stderr,"%d %d ",ghost_p2[i][0],ghost_p2[i][1]);//TODO: Change this to stdin and "printf" to stderr
	}
	fprintf(stderr,"%d %d ", pacman2_x,pacman2_y);
	fprintf(stderr,"%d %d ", score1,score2);
	fprintf(stderr,"%d %d\n", f1,f2);

}




/*to read the initial state from map

mapstate1 and mapstate2 are arrays for state of bot1 and bot2

map_col,map_row- number of columns and rows in the map
*/
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
			if(map_state2[i][j]=='A')			//ABCD
				map_state2[i][j]='a';
			else if (map_state2[i][j]=='B')			//ABCD
				map_state2[i][j]='b';
			else if (map_state2[i][j]=='C')			//ABCD
				map_state2[i][j]='c';
			else if (map_state2[i][j]=='D')			//ABCD
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
		if(ch=='\n'){map_col=j-1;j=0;i++;}
	}
	fclose(fp);
	map_row=i;
}


/*get current positions of all ghosts and pacman*/

void get_current_positions(int ghost_p1[4][2], int *pacman1_x,int *pacman1_y,int ghost_p2[4][2], int *pacman2_x,int *pacman2_y)
{
	int no_of_g1=0,no_of_g2=0,i,j;
	char ch1,ch2;
	// to get positions of ghosts and pacman frm map_state
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++) 
		{
			ch1 = map_state1[i][j];
			ch2=map_state2[i][j]; 
			//for trace
			if(ch1=='A'||ch1=='B'||ch1=='C'||ch1=='D'){				//ABCD
				ghost_p1[no_of_g1][0]=i;
				ghost_p1[no_of_g1][1]=j;
				no_of_g1++;
			}
			else
			if(ch1=='P'){
				*pacman1_x=i;
				*pacman1_y=j;
			}
			if(ch2=='A'||ch2=='B'||ch2=='C'||ch2=='D'){				//ABCD
				ghost_p2[no_of_g2][0]=i;
				ghost_p2[no_of_g2][1]=j;
				no_of_g2++;
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


/*to read moves from move.txt in corresponding bot folders and change the states of bots*/

void change_state(int ghost_p1[4][2],int pacman1_x,int pacman1_y,int ghost_p2[4][2],int pacman2_x,int pacman2_y)
{
	printf("\n in change state func %d", ++exec_count);
	char path1[30],path2[30];
	int new_ghost_p1[4][2],new_pacman1_x,new_pacman1_y,new_ghost_p2[4][2],new_pacman2_x,new_pacman2_y,i,j;
	FILE *fp;
	int dir;
	

	strcpy(path1,bot1);
	strcat(path1,"/move.txt");
	strcpy(path2,bot2);
	strcat(path2,"/move.txt");

		//for bot1
	fp=fopen(path1,"r"); //FIXME: is r+ needed?
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
	fp=fopen(path2,"r");
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

	//to increment score
	if(map_state1[new_pacman1_x][new_pacman1_y]=='e') score1++;
	else if(map_state1[new_pacman1_x][new_pacman1_y]=='E') {score1=+10; f1=1;}


	if(map_state2[new_pacman2_x][new_pacman2_y]=='e') score2++;
	else if(map_state2[new_pacman2_x][new_pacman2_y]=='E') {score2=+10; f2=1;}
	

	/*If the new position of pacman coincides with the new/current position of G and if f is set, then pacman eats ghost.
	If the new position of pacman coincides with the new/current position of G and if f is not set, then game ends.*/
	for(i=0;i<4;i++)
	{
		if(((new_pacman1_x==ghost_p1[i][0])&&(new_pacman1_y==ghost_p1[i][1]))||((new_pacman1_x==new_ghost_p1[i][0])&&(new_pacman1_y==new_ghost_p1[i][1])))
		{
			if(f1==0)
			{
				write_trace(new_ghost_p1,new_pacman1_x,new_pacman1_y,new_ghost_p2,new_pacman2_x,new_pacman2_y,score1,score2);
				printf("\nexitting bot 2 wins");
				exit(1);
			}
			else if (f1==1)
			{
				if(map_state1[init_ghost_p1[2][0]][init_ghost_p1[2][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[2][0];new_ghost_p1[i][1]=init_ghost_p1[2][1];}
				else if(map_state1[init_ghost_p1[3][0]][init_ghost_p1[3][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[3][0];new_ghost_p1[i][1]=init_ghost_p1[3][1];}				
				else if(map_state1[init_ghost_p1[1][0]][init_ghost_p1[1][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[1][0];new_ghost_p1[i][1]=init_ghost_p1[1][1];}				
				else if(map_state1[init_ghost_p1[4][0]][init_ghost_p1[4][1]]=='.')
					{new_ghost_p1[i][0]=init_ghost_p1[4][0];new_ghost_p1[i][1]=init_ghost_p1[4][1];}
				f1=0;
			}
		}

		if(((new_pacman2_x==ghost_p2[i][0])&&(new_pacman2_y==ghost_p2[i][1]))||((new_pacman2_x==new_ghost_p2[i][0])&&(new_pacman2_y==new_ghost_p2[i][1])))
		{
			if(f2==0)
			{
				write_trace(new_ghost_p1,new_pacman1_x,new_pacman1_y,new_ghost_p2,new_pacman2_x,new_pacman2_y,score1,score2);
				printf("\nexitting bot 1 wins");
				exit(1);
			}
			else if (f2==1)
			{
				//pacman eats ghost
				if(map_state1[init_ghost_p2[2][0]][init_ghost_p2[2][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[2][0];new_ghost_p2[i][1]=init_ghost_p2[2][1];}
				else if(map_state1[init_ghost_p2[3][0]][init_ghost_p2[3][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[3][0];new_ghost_p2[i][1]=init_ghost_p2[3][1];}				
				else if(map_state1[init_ghost_p2[1][0]][init_ghost_p2[1][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[1][0];new_ghost_p2[i][1]=init_ghost_p2[1][1];}				
				else if(map_state1[init_ghost_p2[4][0]][init_ghost_p2[4][1]]=='.')
					{new_ghost_p2[i][0]=init_ghost_p2[4][0];new_ghost_p2[i][1]=init_ghost_p2[4][1];}
				f2=0;
			}
		}
	}
	

	
	//if pacmans don't coincide
	//new positions of pacman
	map_state1[new_pacman1_x][new_pacman1_y]='P';
	map_state2[new_pacman1_x][new_pacman1_y]='p';	
	map_state2[new_pacman2_x][new_pacman2_y]='P';
	map_state1[new_pacman2_x][new_pacman2_y]='p';	
		
	//new positions of ghosts
	//check if ghosts do not coincide and to keep track of old values at positions where ghost was present
/*	for(i=0;i<4;i++)
	{	
		if(map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]]!='G')			//ABCD
			g1[i]=map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]];
		if(map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]]!='G')			
			g2[i]=map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]];
				
		map_state1[new_ghost_p1[i][0]][new_ghost_p1[i][1]]='G';
		map_state2[new_ghost_p1[i][0]][new_ghost_p1[i][1]]='g';

		map_state2[new_ghost_p2[i][0]][new_ghost_p2[i][1]]='G';
		map_state1[new_ghost_p2[i][0]][new_ghost_p2[i][1]]='g';
	}*/


		if(map_state1[new_ghost_p1[0][0]][new_ghost_p1[0][1]]!='A')			//ABCD
			g1[0]=map_state1[new_ghost_p1[0][0]][new_ghost_p1[0][1]];
		if(map_state1[new_ghost_p1[1][0]][new_ghost_p1[1][1]]!='B')			//ABCD
			g1[1]=map_state1[new_ghost_p1[1][0]][new_ghost_p1[1][1]];
		if(map_state1[new_ghost_p1[2][0]][new_ghost_p1[2][1]]!='C')			//ABCD
			g1[2]=map_state1[new_ghost_p1[2][0]][new_ghost_p1[2][1]];
		if(map_state1[new_ghost_p1[3][0]][new_ghost_p1[3][1]]!='D')			//ABCD
			g1[3]=map_state1[new_ghost_p1[3][0]][new_ghost_p1[3][1]];

		if(map_state2[new_ghost_p2[0][0]][new_ghost_p2[0][1]]!='A')			//ABCD
			g2[0]=map_state2[new_ghost_p2[0][0]][new_ghost_p2[0][1]];
		if(map_state2[new_ghost_p2[1][0]][new_ghost_p2[1][1]]!='B')			//ABCD
			g2[1]=map_state2[new_ghost_p2[1][0]][new_ghost_p2[1][1]];
		if(map_state2[new_ghost_p2[2][0]][new_ghost_p2[2][1]]!='C')			//ABCD
			g2[2]=map_state2[new_ghost_p2[2][0]][new_ghost_p2[2][1]];
		if(map_state2[new_ghost_p2[3][0]][new_ghost_p2[3][1]]!='D')			//ABCD
			g2[3]=map_state2[new_ghost_p2[3][0]][new_ghost_p2[3][1]];


		
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

/*	printf("\nmapstate1\n");
	for (i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++)
		{
			printf("%c ",map_state1[i][j]);
		}
		printf("\n");
	}*/
	printf("\nout of change state");
}

