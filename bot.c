#include<stdio.h>
#include<string.h>
#include<math.h>

#define map_row 11
#define map_col 20

char map_state[map_row][map_col];
int f=1;

void read_state();
void display_state();
void get_coordinates(int *row, int *col, char element);

int move_pacman1(int pr,int pc);

int move_ghost(int ghost_row,int ghost_col, int pr,int pc);
int get_ghost_dir_least(float left_dis,float right_dis,float up_dis,float down_dis);
int get_ghost_dir_highest(float left_dis,float right_dis,float up_dis,float down_dis);
int main()
{
	int i,pr,pc,gr[4],gc[4],pacman,g[4];
	FILE *fp1;
	read_state();
	display_state();
	
	/*corrdinates of pacman n ghosts*/
	get_coordinates(&pr,&pc,'P');
	printf("\npacrow-%d   \npaccol-%d",pr,pc);
	
	get_coordinates(&gr,&gc,'G');
	for(i=0;i<4;i++)
	printf("\nghostrow-%d   ghostcol-%d",gr[i],gc[i]);
		
	pacman=move_pacman1(pr,pc);
	printf("\npacman move %d  ", pacman);
	
	for(i=0;i<4;i++)
	{	
		g[i]=0;
		if(gr[i]!=-1||gc[i]!=-1)
		{
			g[i]=move_ghost(gr[i],gc[i],pr,pc);
			printf("\ng%d move %d  ",i, g[i]);
		}
	}
	fp1=fopen("bot1/move.txt", "w+");
	fprintf(fp1,"%d %d %d %d %d",g[0],g[1],g[2],g[3],pacman);
	
	
}

void read_state()
{
	int i,j;	
	FILE *fp;
	fp=fopen("state2.txt", "r");
	for(i=0;i<map_row;i++)
	{	
		for(j=0;j<map_col;j++)
		{
			fscanf(fp,"%c ",&map_state[i][j]); 
		}
	}
}

void display_state()
{
	int i,j;
	for(i=0;i<map_row;i++)
		{	
			for(j=0;j<map_col;j++)
			{
				printf("%c ", map_state[i][j]); 
			}
			printf("\n");
		}
}
void get_coordinates(int *row, int *col, char element)
{
	int i,j;
	int ghost_count=0;
	*row=-1;*col=-1;
	for(i=0;i<4;i++)
	{
		row[i]=-1;col[i]=-1;
	}
	if(element!='P'&&element!='G') {return;}
	if(element=='P')
	{
	for(i=0;i<map_row;i++)
	{
		for(j=0;j<map_col;j++)
		{
			if(map_state[i][j]==element)
				{
					*row=i;*col=j;
					printf("\nin %d %d",i,j);
					return;	
				}		
		}
	}
		*row=-1;*col=-1;
	}
	else
	{
		for (i=0;i<map_row;i++)
		{
			for(j=0;j<=map_col;j++)
			{
				if(map_state[i][j]==element)
				{
					row[ghost_count]=i;col[ghost_count]=j;
					ghost_count++;
					printf("\nin %d %d",i,j);
					if(ghost_count==4) return;
					
				}		
			}
		}
	}	


}
int move_pacman1(int pr,int pc)
{
	int pleft_row,pleft_col,pright_row,pright_col,pup_col,pup_row,pdown_row,pdown_col;

	pleft_row=pr;
	pleft_col=pc-1;

	pright_row=pr;
	pright_col=pc+1;
		
	pup_row=pr-1;
	pup_col=pc;

	pdown_row=pr+1;
	pdown_col=pc;
	
	if(map_state[pright_row][pright_col]!='W'&&map_state[pright_row][pright_col]!='G')
		return 4;

	else if(map_state[pleft_row][pleft_col]!='W'&&map_state[pleft_row][pleft_col]!='G')
		return 3;

	else if(map_state[pup_row][pup_col]!='W'&&map_state[pup_row][pup_col]!='G')
		return 1;

	else if(map_state[pdown_row][pdown_col]!='W'&&map_state[pdown_row][pdown_col]!='G')
		return 2;
	
}


int move_ghost(int ghost_row,int ghost_col,int pr, int pc)
{

//	int ghost_row, ghost_col;
	
	int gleft_row, gleft_col,gright_row,gright_col,gup_row, gup_col, gdown_row, gdown_col;
	float left_dis=-1,right_dis=-1,up_dis=-1,down_dis=-1;

	gleft_row=ghost_row;
	gleft_col=ghost_col-1;
	
	gright_row=ghost_row;
	gright_col=ghost_col+1;
	
	gup_row=ghost_row-1;
	gup_col=ghost_col;

	gdown_row=ghost_row+1;
	gdown_col=ghost_col;



	if(map_state[gleft_row][gleft_col]!='W')
	{
		left_dis=(sqrt(((gleft_row-pr)*(gleft_row-pr))+((gleft_col-pc)*(gleft_col-pc))));
	}

	if(map_state[gright_row][gright_col]!='W')
	{
		right_dis=(sqrt((gright_row-pr)*(gright_row-pr)+(gright_col-pc)*(gright_col-pc)));
	}
	if(map_state[gup_row][gup_col]!='W')
	{
		up_dis=(sqrt((gup_row-pr)*(gup_row-pr)+(gup_col-pc)*(gup_col-pc)));
	}
	if(map_state[gdown_row][gdown_col]!='W')
	{
		down_dis=(sqrt((gdown_row-pr)*(gdown_row-pr)+(gdown_col-pc)*(gdown_col-pc)));
	}
	if(f==0)
	return (get_ghost_dir_least(left_dis,right_dis,up_dis,down_dis));
	else
	return (get_ghost_dir_highest(left_dis,right_dis,up_dis,down_dis));

}

int get_ghost_dir_least(float left_dis,float right_dis,float up_dis,float down_dis)
{
	//check where no path
	float least=1000;
	int move;
	//least =left_dis;
	//move=3;
	if(left_dis<least&&left_dis!=-1)
		{least=left_dis;move=3;}
	if(right_dis<least&&right_dis!=-1)
		{least=right_dis;move=4;}
	if(up_dis<least&&up_dis!=-1)
		{least=up_dis;move=1;}
	if(down_dis<least&&down_dis!=-1)
		{least=down_dis;move=2;}
	return move;


}
int get_ghost_dir_highest(float left_dis,float right_dis,float up_dis,float down_dis)
{
	//write conditions to check wall
	float highest=0;
	int move;
	
	if(left_dis>highest&&left_dis!=-1)
		{highest=left_dis;move=3;}
	if(right_dis>highest&&right_dis!=-1)
		{highest=right_dis;move=4;}
	if(up_dis>highest&&up_dis!=-1)
		{highest=up_dis;move=1;}
	if(down_dis>highest&&down_dis!=-1)
		{highest=down_dis;move=2;}
	return move;


}

