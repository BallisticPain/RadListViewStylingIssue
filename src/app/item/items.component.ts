import { Component, OnInit } from '@angular/core'
import { View } from '@nativescript/core'
import { ListViewEventData } from "nativescript-ui-listview"

import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Array<Item>

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems()
  }

  onCellSwiping(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const currentItemView = args.object;

    if (args.data.x > 200) {
      console.log("Notify perform left action");
    } else if (args.data.x < -200) {
      console.log("Notify perform right action");
    }
  }

  onSwipeCellStarted(args: ListViewEventData) {
    console.log('Cell swipe started');
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const leftItem = swipeView.getViewById<View>('left-view');
    const rightItem = swipeView.getViewById<View>('right-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }

  onSwipeCellFinished(args: ListViewEventData) {
    console.log('Cell swipe finished');
  }

  onLeftSwipeClick(args: ListViewEventData) {
    // Left Swipe is to Open the Job
    console.log('Left Swipe Click', args.index);
  }

  onRightSwipeClick(args: ListViewEventData) {
    // Right Swipe is to View Summary
    console.log('Right Swipe Click', args.index, args.data);
  }
}
