

#include <iostream>
#include <vector>

using namespace std;

int H, W;
vector<string> S;
vector<vector<int>> groups;

void get_around_non_zero(int i, int j, int val) {
    for (int x = i - 1; x <= i + 1; x++) {
        for (int y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < H && y >= 0 && y < W) {
                if (S[x][y] != '#') {
                    groups[x][y] = val;
                }
                if (S[x][y] == '#' && groups[x][y] == 0) {
                    groups[x][y] = val;
                    get_around_non_zero(x, y, val);
                }
            }
        }
    }
}

int main() {
    cin >> H >> W;
    S.resize(H);
    groups.assign(H, vector<int>(W, 0));

    for (int i = 0; i < H; i++) {
        cin >> S[i];
    }

    int curr_group = 0;

    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            if (S[i][j] == '#' && groups[i][j] == 0) {
                curr_group++;
                get_around_non_zero(i, j, curr_group);
            }
        }
    }

    cout << curr_group << endl;

    return 0;
}



import sys
sys.setrecursionlimit(10**10)
import pypyjit
pypyjit.set_param('max_unroll_recursion=-1')

def input_str():
    return sys.stdin.readline().rstrip()

def input_int():
    return int(sys.stdin.readline().rstrip())

def input_str_multi():
    return sys.stdin.readline().rstrip().split()

def input_int_multi():
    return list(map(int, sys.stdin.readline().split()))

N = input_int()
T_D = []


set_time = set()

for _ in range(N):
    T,D = input_int_multi()
    T_D.append((T,D))
    set_time.add(T)
    set_time.add(T+D)

diaa = {}
mins = min(set_time)
idx = 1
for i in (sorted(set_time)):
    if i > mins + 1:  
        idx += 1
        diaa[i] = idx
    else:
        diaa[i] = idx
    idx += 1

    mins = i


dp = [0 for _ in range(max(diaa.values()))]

for i in range(dp):
    

H, W = input_int_multi()
S = []

for _ in range(H):
    row = input_str()
    S.append(row)

groups = [[0 for _ in range(W)] for _ in range(H)]

curr_group = 0

def get_around_non_zero(i,j, val):
    for x in range(i - 1, i + 2):
        for y in range(j - 1, j + 2):
 
            if 0 <= x < H and 0 <= y < W and S[x][y] != "#":
                groups[x][y] = val
            if 0 <= x < H and 0 <= y < W and S[x][y] == "#" and groups[x][y] == 0:
                groups[x][y] = val
                get_around_non_zero(x,y,val)

    

for i in range(H):
    for j in range(W):
        if S[i][j] == "#" and groups[i][j] == 0:
            curr_group += 1
            get_around_non_zero(i,j, curr_group)
            print(groups)

print(curr_group)

N = input_int()
hours = [0 for i in range(24)]
member_time = []
for i in range(N):
    W,X = input_int_multi()
    member_time.append((i+1,W,X))

for s in member_time:
    idx, members, time = s
    for curr in range(9):
        hours[(curr + time)%24] += members

print(max(hours))

S, T = input_str_multi()

print(f"{S} san")