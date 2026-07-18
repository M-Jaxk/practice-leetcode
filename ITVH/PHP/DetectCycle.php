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
readonly class DetectCycle
{
    /**
     * @param ListNode $head
     * @return ListNode
     */
    public function execute(?ListNode $head):bool
    {
        $slow = $head;
        $fast = $head;

        while ($fast !== null && $fast->next !== null) {

            $slow = $slow->next;
            $fast = $fast->next->next;

            if ($slow === $fast) {
                return true;
            }
        }

        return false;
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
                new ListNode(
                    5,
                    new ListNode(2)
                )
            )
            
        )
    )
);

print_r((new DetectCycle())->execute($head));
// print_r((new ReverseList())->execute($head));
// print_r((new ReverseList())->execute( [0,1,1],2));
// print_r((new ReverseList())->execute( [0,0,0],5));
