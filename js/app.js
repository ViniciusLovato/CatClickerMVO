
  const data = {
    currentCat: null,
    cats: [
    {
      id: 1,
      name: 'Romeu',
      imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
      counter: 0
    },
    {
      id: 2,
      name: 'Kittie',
      imgSrc: 'https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350',
      counter: 0
    },
    {
      id: 3,
      name: 'Meow',
      imgSrc: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
      counter: 0
    },
    {
      id: 4,
      name: 'Purr',
      imgSrc: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      counter: 0
    },  
  ]}

  const controller = {
    getCats: () => {
      return data.cats
    },
    setCurrentCat: cat => {
      data.currentCat = cat;
      viewCat.render();
      viewList.render();
      editCat.render();
    },
    saveCurrentCat: () => {
      let id = data.cats.findIndex( cat => cat.id === data.currentCat.id);
      data.cats[id] = data.currentCat;
      viewCat.render();
      viewList.render();
    },
    getCurrentCat: () => {
      return data.currentCat;
    },
    addCounterToCurrentCat: () => {
      data.currentCat.counter += 1;
      viewCat.render();
    },
    init: () => {
      data.currentCat = data.cats[0];
      viewList.init();
      viewCat.init();
      editCat.init();
    }
  }

  const viewList = {
    init: () => {
      this.$catList = document.getElementById('cat-list');
      viewList.render();
    },

    render: () => {
      // empty the cat list
      this.$catList.innerHTML = '';

      controller.getCats().forEach( cat => {

          elem = document.createElement('li');
          elem.textContent = cat.name;

          elem.addEventListener('click', ( catCopy => {
              return () => {
                  controller.setCurrentCat(catCopy);
                  viewCat.render();
              };
          })(cat));

          this.$catList.appendChild(elem);
      });
    }
  }

  const viewCat = {
    init: () => {
      this.$catImg = document.getElementById('cat-img');
      this.$catCounter = document.getElementById('cat-counter');

      this.$catImg.addEventListener('click', e => {
        controller.addCounterToCurrentCat();
      });

      viewCat.render();
    },

    render: () => {
      const currentCat = controller.getCurrentCat();
      this.$catImg.src = currentCat.imgSrc;
      this.$catCounter.innerHTML = currentCat.counter;
    }
  } 

  const editCat = {
    init: () => {
      this.currentCat = controller.getCurrentCat();
      this.$inputName = document.getElementById('input-name');
      this.$inputImg = document.getElementById('input-img');
      this.$inputClicks = document.getElementById('input-clicks');

      this.$adminBtn = document.getElementById('admin-btn');
      this.$saveBtn = document.getElementById('save-btn');
      this.$cancelBtn = document.getElementById('cancel-btn');

      this.$catEditForm = document.querySelector('.toggle-content');

      this.$adminBtn.addEventListener('click', e => {
        this.$catEditForm.classList.toggle('is-visible');
        editCat.render();
      });

      this.$cancelBtn.addEventListener('click', e => {
        this.$catEditForm.classList.toggle('is-visible');
      })

      this.$saveBtn.addEventListener('click', e => {
        controller.setCurrentCat({
          id: this.currentCat.id,
          name: this.$inputName.value,
          imgSrc: this.$inputImg.value,
          counter: parseInt(this.$inputClicks.value)
        });
        controller.saveCurrentCat();
      });

    },

    render: () => {
      this.currentCat = controller.getCurrentCat();      
      this.$inputName.value = this.currentCat.name;
      this.$inputImg.value = this.currentCat.imgSrc;
      this.$inputClicks.value = this.currentCat.counter;
    }
  }
  controller.init();

