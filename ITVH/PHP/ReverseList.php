<?php
declare(strict_types=1);
namespace ITVH;

class ListNode
{
    public int $val;
    public ?ListNode $next;

    public function __construct($val = 0, $next = null)
    {
        $this->val = $val;
        $this->next = $next;
    }
}
readonly class ReverseList
{
    /**
     * @param ListNode $head
     * @return ListNode
     */
    public function execute(?ListNode $head):?ListNode
    {
        $prev = null;
        $current = $head;//1
        while($current !== null){
            $next = $current->next;//2

            $current->next = $prev;//null

            $prev = $current; //1
            $current = $next; //2
        }
        return $prev;
    }
}
$head = new ListNode(
    1,
    new ListNode(
        2,
        new ListNode(
            3,
            new ListNode(
                4,
                new ListNode(5)
            )
        )
    )
);

$reversed = (new ReverseList())->execute($head);
print_r($reversed);
// print_r((new ReverseList())->execute($head));
// print_r((new ReverseList())->execute( [0,1,1],2));
// print_r((new ReverseList())->execute( [0,0,0],5));
