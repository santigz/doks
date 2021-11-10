SRCS := $(shell find . -name *.md)
OBJS := $(SRCS:.md=.html)
marp = marp --html

.PHONY: all
all: $(OBJS)

%.html: %.md
	$(marp) $<

serve: all
	$(marp) -sw .

prod:
	rsync -avh --delete . santi@sgz.es:/var/www/sgz.es/diw

