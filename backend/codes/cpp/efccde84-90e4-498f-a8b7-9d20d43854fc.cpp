#include<bits/stdc++.h>
using namespace std;
class Solution {
public:
    int removeElement(int n,int nums[], int val) {
        int index = 0;
        for(int i = 0; i< n; i++){
            if(nums[i] != val){
                nums[index] = nums[i];
                index++;
            }
        }
        return index;
    }
};
int main()
{
    int n;
    cin>>n;
    int nums[n];
    for(int i=0;i<n;i++)
    {
      cin>>nums[i];
    }
    int val;
    cin>>val;
    Solution obj;
    cout<<obj.removeElement(n,nums,val);
    return 0;
}